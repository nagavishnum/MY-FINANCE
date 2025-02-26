const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance'); // Importing the Finance model
const mongoose = require('mongoose');

// ✅ Create Investment (Add a new investment)
router.post('/investments/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { whereInvested, amountInvested, returnPercent, totalReturn } = req.body;

    let finance = await Finance.findOne({ userId });

    if (!finance) {
      finance = new Finance({ userId, categories: { investment: [] } });
    }

    const newInvestment = {
      id: new mongoose.Types.ObjectId(), // Unique ID for each investment
      whereInvested,
      amountInvested,
      returnPercent,
      totalReturn
    };

    finance.categories.investment.push(newInvestment);
    await finance.save();

    res.status(201).json({ message: "Investment added successfully!", investment: newInvestment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Read Investments (Get all investments for a user)
router.get('/investments/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const finance = await Finance.findOne({ userId });

    if (!finance) {
      return res.status(404).json({ message: "No investment data found!" });
    }

    res.json(finance.categories.investment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/investments/:userId/:investmentId', async (req, res) => {
  try {
    const { userId, investmentId } = req.params;
    const { whereInvested, amountInvested, returnPercent, totalReturn } = req.body;

    const finance = await Finance.findOneAndUpdate(
      { userId, "categories.investment.id": new mongoose.Types.ObjectId(investmentId) },
      { 
        $set: { 
          "categories.investment.$.whereInvested": whereInvested,
          "categories.investment.$.amountInvested": amountInvested,
          "categories.investment.$.returnPercent": returnPercent,
          "categories.investment.$.totalReturn": totalReturn
        } 
      },
      { new: true }
    );

    if (!finance) {
      return res.status(404).json({ message: "Investment not found!" });
    }

    res.json({ message: "Investment updated successfully!", finance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete Investment (Remove an investment)
router.delete('/investments/:userId/:investmentId', async (req, res) => {
  try {
    const { userId, investmentId } = req.params;

    const finance = await Finance.findOneAndUpdate(
      { userId },
      { $pull: { "categories.investment": { id: investmentId } } },
      { new: true }
    );

    if (!finance) {
      return res.status(404).json({ message: "Investment not found!" });
    }

    res.json({ message: "Investment deleted successfully!", finance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🏦 Helper function to get user's finance record or create a new one
const getOrCreateFinance = async (userId) => {
  let finance = await Finance.findOne({ userId });
  if (!finance) {
    finance = new Finance({ userId, categories: { loan: [], savings: [], assets: [], lent: [] } });
    await finance.save();
  }
  return finance;
};

// 📌 Create New Entry (Loan, Savings, Assets, Lent)
router.post('/:category', async (req, res) => {
  try {
    const { userId, ...data } = req.body;
    const { category } = req.params;

    if (!userId || !['loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category or missing userId!" });
    }

    let finance = await getOrCreateFinance(userId);

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

    if (!['loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    const finance = await Finance.findOne({ userId });

    if (!finance || !finance.categories[category].length) {
      return res.status(404).json({ message: `No ${category} records found!` });
    }

    res.status(200).json(finance.categories[category]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Update a Specific Entry (Partial Update)
router.put('/:category/:userId/:entryId', async (req, res) => {
  try {
    const { category, userId, entryId } = req.params;
    const updateData = req.body;

    if (!['loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    let finance = await Finance.findOne({ userId });
    if (!finance) return res.status(404).json({ message: "Finance record not found!" });

    let itemIndex = finance.categories[category].findIndex(item => item.id == entryId);
    if (itemIndex === -1) return res.status(404).json({ message: `${category} entry not found!` });

    // ✅ Partial update (only update fields provided in the request)
    Object.keys(updateData).forEach(field => {
      finance.categories[category][itemIndex][field] = updateData[field];
    });

    await finance.save();
    res.status(200).json({ message: `${category} entry updated!`, updatedData: finance.categories[category][itemIndex] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Delete a Specific Entry
router.delete('/:category/:userId/:entryId', async (req, res) => {
  try {
    const { category, userId, entryId } = req.params;

    if (!['loan', 'savings', 'assets', 'lent'].includes(category)) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    let finance = await Finance.findOne({ userId });
    if (!finance) return res.status(404).json({ message: "Finance record not found!" });

    finance.categories[category] = finance.categories[category].filter(item => item.id != entryId);

    await finance.save();
    res.status(200).json({ message: `${category} entry deleted successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
