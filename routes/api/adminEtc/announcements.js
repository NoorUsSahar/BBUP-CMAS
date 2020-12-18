const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/adminEtc/auth');
const { check, validationResult } = require('express-validator');
const Announcement = require('../../../models/adminEtc/Announcement');
const User = require('../../../models/adminEtc/User');
const Admission = require('../../../models/adminEtc/Admission');

// @route  GET /api/announcement
// @desc   Get all announcements
// @access Private
router.get('/', async (req, res) => {
  try {
    const announcement = await Announcement.find();
    const feeds = announcement[0].feeds;

    res.json(feeds);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  GET /api/announcement/current
// @desc   Get current announcement feed
// @access Private
router.get('/current', auth, async (req, res) => {
  try {
    const announcement = await Announcement.find();

    const feed = announcement[0].feed[0];

    res.json(feed);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  POST /api/admin
// @desc   Create an announcement as Admin
// @access Private
router.post(
  '/admin',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty(),
    check('startDate', 'Start date is required')
      .not()
      .isEmpty(),
    check('endDate', 'End date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, message, startDate, endDate } = req.body;

    try {
      const user = await User.findById(req.user.id);

      // if (user.type != 0) {
      //   return res
      //     .status(400)
      //     .json({ msg: 'User is not authorized to make announcement' });
      // }

      let announcement = await Announcement.find();

      if (announcement.length === 0) {
        announcement = new Announcement();
      } else {
        announcement = announcement[0];
      }

      const newFeed = {
        name,
        message,
        startDate,
        endDate
      };

      if (
        announcement.feeds.map(feed => feed.name).indexOf(newFeed.name) !== -1
      ) {
        return res.status(400).json({ msg: 'Announcement already exists.' });
      }

      announcement.feeds.push(newFeed);

      await announcement.save();
      res.json(announcement);
    } catch (err) {
      console.log(err.message);
      return res.json(500).send('Server Error');
    }
  }
);

// @route  POST /api/coordinator
// @desc   Create an announcement as Coordinator
// @access Private
router.post(
  '/coordinator',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty(),
    check('startDate', 'Start date is required')
      .not()
      .isEmpty(),
    check('endDate', 'End date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, message, startDate, endDate } = req.body;

    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 1) {
        return res
          .status(400)
          .json({ msg: 'User is not authorized to make announcement' });
      }

      let announcement = await Announcement.find();

      if (announcement.length === 0) {
        announcement = new Announcement();
      } else {
        announcement = announcement[0];
      }

      const newFeed = {
        name,
        message,
        startDate,
        endDate
      };

      if (
        announcement.feeds.map(feed => feed.name).indexOf(newFeed.name) !== -1
      ) {
        return res.status(400).json({ msg: 'Announcement already exists.' });
      }

      announcement.feeds.push(newFeed);

      await announcement.save();
      res.json(announcement);
    } catch (err) {
      console.log(err.message);
      return res.json(500).send('Server Error');
    }
  }
);

// @route  GET /api/announcement/:id
// @desc   Get announcement feed by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const announcement = await Announcement.find();
    const feed = announcement[0].feeds.filter(
      feed => feed._id.toString() === req.params.id
    )[0];

    res.json(feed);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route  PUT /api/enable-announcement-feed/:id
// @desc   Enable announcement feed by id
// @access Private
router.put(
  '/enable-announcement-feed/:id',
  [auth, check('status', 'Status is required').isBoolean()],
  async (req, res) => {
    try {
      const announcement = await Announcement.find();
      const feed = announcement[0].feeds.filter(
        feed => feed._id.toString() === req.params.id
      )[0];

      feed.status = true;

      await announcement[0].save();

      res.json(announcement);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/disable-announcement-feed/:id
// @desc   Disable announcement feed by id
// @access Private
router.put(
  '/disable-announcement-feed/:id',
  [auth, check('status', 'Status is required').isBoolean()],
  async (req, res) => {
    try {
      const announcement = await Announcement.find();
      const feed = announcement[0].feeds.filter(
        feed => feed._id.toString() === req.params.id
      )[0];

      feed.status = false;

      await announcement[0].save();

      res.json(announcement);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/update-admin-announcement-feed/:id
// @desc   Update announcement feed by id
// @access Private
router.put(
  '/update-admin-announcement-feed/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty(),
    check('startDate', 'Start date is required')
      .not()
      .isEmpty(),
    check('endDate', 'End date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, message, startDate, endDate } = req.body;
    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 0) {
        return res
          .status(400)
          .json({ msg: 'This user is not authorized to update this post' });
      }

      const announcement = await Announcement.find();
      // announcement[0].feeds.map(feed => {
      //   if (feed._id.toString() === req.params.id) {
      //     feed.name = name;
      //     feed.message = message;
      //     feed.startDate = startDate;
      //     feed.endDate = endDate;
      //   }
      //   return feed;
      // });

      const feed = announcement[0].feeds.filter(
        feed => feed._id.toString() === req.params.id
      )[0];

      feed.name = name;
      feed.message = message;
      feed.startDate = startDate;
      feed.endDate = endDate;

      await announcement[0].save();

      res.json(feed);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  PUT /api/update-coordinator-announcement-feed/:id
// @desc   Update announcement feed by id
// @access Private
router.put(
  '/update-coordinator-announcement-feed/:id',
  [
    auth,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('message', 'Message is required')
      .not()
      .isEmpty(),
    check('startDate', 'Start date is required')
      .not()
      .isEmpty(),
    check('endDate', 'End date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, message, startDate, endDate } = req.body;
    try {
      const user = await User.findById(req.user.id);

      if (user.type !== 1) {
        return res
          .status(400)
          .json({ msg: 'This user is not authorized to update this post' });
      }

      const announcement = await Announcement.find();
      // announcement[0].feeds.forEach(feed => {
      //   if (feed._id.toString() === req.params.id) {
      //     feed.name = name;
      //     feed.message = message;
      //     feed.startDate = startDate;
      //     feed.endDate = endDate;
      //   }
      //   // return feed;
      // });

      const feed = announcement[0].feeds.filter(
        feed => feed._id.toString() === req.params.id
      )[0];

      feed.name = name;
      feed.message = message;
      feed.startDate = startDate;
      feed.endDate = endDate;

      await announcement[0].save();

      res.json(feed);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route  DELETE /api/remove-announcement-feed/:id
// @desc   Remove announcement feed by id
// @access Private
router.delete('/remove-announcement-feed/:id', auth, async (req, res) => {
  try {
    const announcement = await Announcement.find();
    const removeIndex = announcement[0].feeds
      .map(feed => feed._id.toString())
      .indexOf(req.params.id);

    announcement[0].feeds.splice(removeIndex, 1);

    await announcement[0].save();

    res.json({ msg: 'Announcement removed successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
