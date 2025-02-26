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
      id: { type: mongoose.Schema.Types.ObjectId, auto: true },  
      whereInvested: { type: String },
      amountInvested: { type: Number, default: 0, min: 0 },
      returnPercent: { type: Number, default: 0, min: 0 },
      totalReturn: { type: Number, default: 0, min: 0 },
    }],
    loan: [{
      id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      loanAmount: { type: Number, default: 0, min: 0 },
      interestPerYear: { type: Number, default: 0, min: 0 },
      whereLoanTaken: { type: String },
    }],
    savings: [{
      id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      savingsLocation: { type: String },
      amountSaved: { type: Number, default: 0, min: 0 },
    }],
    assets: [{
      id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      assetName: { type: String },
      currentValue: { type: Number, default: 0, min: 0 },
    }],
    lent: [{
      id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      amountLent: { type: Number, default: 0, min: 0 },
      interestRate: { type: Number, default: 0, min: 0 },
      totalAmountDue: { type: Number, default: 0, min: 0 },
      recipient: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, default: "" },
        address: { type: String, default: "" },
        aadhaar: { type: Number }
      },
      collateral: {
        assetType: { type: String },
        estimatedValue: { type: Number, default: 0, min: 0 },
        description: { type: String, default: "" }
      },
      promissoryNote: { type: Boolean, default: false },
    }]
  },
});

module.exports = mongoose.model('Finance', financeSchema);
