import React from 'react';

enum BudgetFields {
    TRUCK_PAYMENT = "truck_payment",
    TRAILER_PAYMENT = "trailer_payment",
    PERMITS = "permits",
    OTHER = "other",
    HEALTH_INSURANCE = "health_insurance",
    FOOD_AND_LODGINGS = "food_and_lodgings",
    EMERGENCEY_EQUIPMENT_FUND = "emergency_equipment_fund",
    DISPATCH_SERVICE = "dispatch_service",
    CARGO_INSURANCE = "cargo_insurance",
    AUTO_INSURANCE = "auto_insurance",
    FUEL = "fuel",
}

enum PaymentSchedule {
    DAILY = "daily",
    MONTHLY = "monthly",
}

interface BudgetItem {
    title: string;
    amount: number;
    increment: PaymentSchedule;
}



const Budget: React.FC<BudgetItem> = ({ title, amount, increment }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>Amount: {amount}</p>
            <p>Payment Schedule: {increment}</p>
        </div>
    );
};

const BudgetState = () => {
    const [budget, setBudget] = React.useState(
        {
            [BudgetFields.TRUCK_PAYMENT]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.TRAILER_PAYMENT]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.PERMITS]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.OTHER]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.HEALTH_INSURANCE]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.FOOD_AND_LODGINGS]: {
                amount: 0,
                increment: PaymentSchedule.DAILY
            },
            [BudgetFields.EMERGENCEY_EQUIPMENT_FUND]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.DISPATCH_SERVICE]: {
                amount: 0,
                increment: PaymentSchedule.DAILY
            },
            [BudgetFields.CARGO_INSURANCE]: {
                amount: 0,
                increment: PaymentSchedule.DAILY
            },
            [BudgetFields.AUTO_INSURANCE]: {
                amount: 0,
                increment: PaymentSchedule.MONTHLY
            },
            [BudgetFields.FUEL]: {
                amount: 0,
                increment: PaymentSchedule.DAILY
            }
        })

    const updateBudgetItem = (item: BudgetItem) => {
        setBudget((prevBudget) => {
            return {
                ...prevBudget,
                [item.title]: item
            }
        });
    };

    const getBudgetDailySum = (budget: any) => {
        let sum = 0;

        for (const key in budget) {
            if (budget[key].increment === PaymentSchedule.DAILY) {
                sum += budget[key].amount;
            }
        }
        return sum;
    }

    const getBudgetMonthlySum = (budget: any) => {
        let sum = 0;

        for (const key in budget) {
            if (budget[key].increment === PaymentSchedule.MONTHLY) {
                sum += budget[key].amount;
            }
        }
        return sum;
    }

    return {
        budget,
        updateBudgetItem,
        getBudgetDailySum,
        getBudgetMonthlySum,
    };
}

export default Budget;
