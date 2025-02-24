const mongoose = require('mongoose');

const financeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalInvested: { type: Number, default: 0 },
  totalLoan: { type: Number, default: 0 },
  totalSavings: { type: Number, default: 0 },
  totalAssetsValue: { type: Number, default: 0 },
  totalLent: { type: Number, default: 0 },
  categories: {
    investment: [{
      whereInvested: { type: String },
      amountInvested: { type: Number, default: 0 },
      returnPercent: { type: Number, default: 0 },
      totalReturn: { type: Number, default: 0 },
    }],
    loan: [{
      loanAmount: { type: Number, default: 0 },
      interestPerYear: { type: Number, default: 0 },
      whereLoanTaken: { type: String },
      totalRepayment: { type: Number, default: 0 },
    }],
    savings: [{
      savingsLocation: { type: String },
      amountSaved: { type: Number, default: 0 },
    }],
    assets: [{
      assetName: { type: String },
      currentValue: { type: Number, default: 0 },
    }],
    lent: [{
      amountLent: { type: Number, default: 0 },
      recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipient' },
      promissoryNote: { type: Boolean, default: false },
      collateral: { type: mongoose.Schema.Types.ObjectId, ref: 'Collateral' },
      interestRate: { type: Number, default: 0 },
      totalAmountDue: { type: Number, default: 0 },
    }]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Finance', financeSchema);
