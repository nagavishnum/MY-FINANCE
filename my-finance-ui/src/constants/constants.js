import AssetsForm from "../pages/myFinance/investments/AssetsForm";
import InvestmentForm from "../pages/myFinance/investments/InvestmentForm";
import LoansForm from "../pages/myFinance/investments/LoansForm";
import SavingsForm from "../pages/myFinance/investments/SavingsForm";

export const userId = "67beb3f68180eda70b3f39d4";
export const JWT_SECRET="your_jwt_secret_key"

export const investmentColumns = ["Where Invested", "Amount Invested", "Expected Return %", "Expected Return"];
export const savingsColumns = ["Saved At", "Amount Saved"];
export const assetsColumns = ["Asset", "Value"];
export const loanColumns = ["Taken From", "Loan Amount", "Intrest"];
export const lentColumns = ["Lent to", "Amount", "Intrest Rate","Amount Paid","Intrest Paid", "Intrest Due", "Total Amount to be paid","Start Date", "Due Date","Total Months", "Collateral Asset", "Phone Number","Promissory Note" ]

export const componentMap = {
    investment: { 
      component: InvestmentForm, 
      columns: investmentColumns, 
      keyMap: ["whereInvested", "amountInvested", "returnPercent", "totalReturn"]
    },
    savings: { 
      component: SavingsForm, 
      columns: savingsColumns, 
      keyMap: ["savingsLocation", "amountSaved"]
    },
    assets: { 
      component: AssetsForm, 
      columns: assetsColumns, 
      keyMap: ["assetName", "currentValue"]
    },
    loan: { 
      component: LoansForm, 
      columns: loanColumns, 
      keyMap: ["whereLoanTaken","loanAmount", "interestPerYear"]
    },
  };
