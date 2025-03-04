const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalInvested: { type: Number, default: 0, min: 0 },
  totalLoan: { type: Number, default: 0, min: 0 },
  totalSavings: { type: Number, default: 0, min: 0 },
  totalAssetsValue: { type: Number, default: 0, min: 0 },
  totalLent: { type: Number, default: 0, min: 0 },
  categories: {
    investment: [{
      id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      whereInvested: { type: String },
      amountInvested: { type: Number, default: 0, min: 0 },
      returnPercent: { type: Number, default: 0, min: 0 },
      totalReturn: { type: Number, default: 0, min: 0 },
    }],
    loan: [{
      id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      loanAmount: { type: Number, default: 0, min: 0 },
      interestPerYear: { type: Number, default: 0, min: 0 },
      whereLoanTaken: { type: String },
    }],
    savings: [{
      id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      savingsLocation: { type: String },
      amountSaved: { type: Number, default: 0, min: 0 },
    }],
    assets: [{
      id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
      assetName: { type: String },
      currentValue: { type: Number, default: 0, min: 0 },
    }],
  },
});

module.exports = mongoose.model('Finance', financeSchema);
