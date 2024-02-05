const express = require('express');
const router = express.Router();
const CheckboxState = require('../models/checkboxStateModel');

// Get checkbox state for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const checkboxState = await CheckboxState.findOne({ userId: req.params.userId });
    res.json(checkboxState);
  } catch (error) {
    console.error('Error fetching checkbox state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update checkbox state for a specific user
router.put('/:userId', async (req, res) => {
  try {
    const { isChecked } = req.body;
    const updatedCheckboxState = await CheckboxState.findOneAndUpdate(
      { userId: req.params.userId },
      { isChecked },
      { new: true }
    );
    res.json(updatedCheckboxState);
  } catch (error) {
    console.error('Error updating checkbox state:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
