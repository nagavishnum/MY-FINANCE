const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');
const mongoose = require('mongoose');

// 🏦 Helper function to get user's finance record or create a new one
const getOrCreateFinance = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  let finance = await Finance.findOne({ userId: objectId });
  if (!finance) {
    finance = new Finance({ 
      userId: objectId, 
      categories: { investment: [], loan: [], savings: [], assets: [], lent: [] } 
    });
    await finance.save();
  }
  return finance;
};

// 📌 Create New Entry (Investment, Loan, Savings, Assets, Lent)
router.post('/:category/:userId', async (req, res) => {
  try {
    const { category, userId } = req.params;
    const objectId = new mongoose.Types.ObjectId(userId);
    const data = req.body;

    if (!['investment', 'loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category or missing userId!" });
    }

    let finance = await getOrCreateFinance(objectId);
    finance.categories[category].push(data);
    await finance.save();

    res.status(201).json({ message: `${category} added successfully!`, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Get All Entries for a User by Category
router.get('/:category/:userId', async (req, res) => {
  try {
    const { category, userId } = req.params;
    const objectId = new mongoose.Types.ObjectId(userId);

    if (!['investment', 'loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    const finance = await Finance.findOne({ userId: objectId });

    if (!finance || !finance.categories[category].length) {
      return res.status(204).json({ message: `No ${category} records found!` });
    }

    res.status(200).json(finance.categories[category]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update a Specific Entry
router.put('/:category/:userId/:entryId', async (req, res) => {
  try {
    const { category, userId, entryId } = req.params;
    const updateData = req.body;

    // Validate category
    if (!['investment', 'loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    // Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Find the finance record for the user
    let finance = await Finance.findOne({ userId: objectId });
    if (!finance) {
      return res.status(404).json({ message: "Finance record not found!" });
    }

    console.log("Finance Record Found:", finance);

    // Find the entry in the specified category
    let itemIndex = finance.categories[category].findIndex(item => item.id.toString() === entryId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: `${category} entry not found!` });
    }

    console.log("Entry Found at Index:", itemIndex);

    // Update the specific entry
    Object.assign(finance.categories[category][itemIndex], updateData);

    // Save the updated document
    await finance.save();

    res.status(200).json({ message: `${category} entry updated!`, updatedData: finance.categories[category][itemIndex] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
});


// 📌 Delete a Specific Entry
router.delete('/:category/:userId/:entryId', async (req, res) => {
  try {
    const { category, userId, entryId } = req.params;
    const objectId = new mongoose.Types.ObjectId(userId);

    if (!['investment', 'loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    let finance = await Finance.findOne({ userId: objectId });
    if (!finance) return res.status(404).json({ message: "Finance record not found!" });

    finance.categories[category] = finance.categories[category].filter(item => item.id.toString() !== entryId);
    await finance.save();

    res.status(200).json({ message: `${category} entry deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
