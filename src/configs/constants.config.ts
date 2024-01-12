import dotenv from "dotenv";
dotenv.config();

export const DATABASE_URI: string = process.env.DATABASE_URI!;
export const DATABASE_URI_TEST = process.env.DATABASE_URI_TEST;
export const JWT_SECRET = process.env.JWT_SECRET;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const PORT: number = parseInt(process.env.PORT || "5000", 10);
export const SECRET = process.env.SECRET!;
export const MAXAGE = 30 * 60 * 1000;
export const BASEPATH = "/api/v1";

export const ENUM = {
  SEX: ["M", "F", "LGBTQ"],
  ADMIN_ROLE: ["hod", "advisor", "lecturer", "lab_attendant"],
  STUDENT_ROLE: ["Course Rep", "Assistant Course Rep", "Regular"],
  TITLE: ["Mr.", "Mrs.", "Ms.", "Miss"],
  STATUS: ["Pending", "Rejected", "Completed", "Active"],
  LOAN: ["Personal", "Mortgage", "Rent"],
};

export const DATABASES = {
  USER: "user",
  TRANSACTION: "transaction",
  BANK_DETAIL: "bank_detail",
};

export const MESSAGES = {
  DATABASE: {
    CONNECTED: "MongoDB is connected",
    ERROR: "There was an error while connecting to the database.",
  },
  DATABASE_TEST: {
    CONNECTED: "Test MongoDB is connected",
    ERROR: "There was an error while connecting to the test database.",
  },
  USER: {
    CREATED: "User created successfully",
    FETCHED: "User fetched successfully",
    FETCHEDALL: "User fetched successfully",
    UPDATED: "User updated successfully",
    DELETED: "User deleted successfully",
    DUPLICATE_ERROR: "User already exists",
    DUPLICATE_EMAIL: "Email already exists",
    DUPLICATE_NAME: "Name already exists",
    INVALID_ID_ERROR: "Id doesn't exist",
    INVALID_USER_ERROR: "User doesn't exist",
    INVALID_OBJID_ERROR: "Id is not a valid objectId",
    INVALID_EMAIL_ERROR: "Invalid email",
    INVALID_PASSWORD_ERROR: "Invalid password",
    LOGGEDIN: "Login was successful",
    LOGGEDOUT: "Logout was successful",
  },
  LOAN: {
    INVALID_LOAN_EXISTING:
      "Unathorized Request. An Active/Pending Loan was found on this account.",
    CREATED: "Loan Application Submitted successfully",
    FETCHED: "Loan fetched successfully",
    UPDATED: "Loan Updated successfully",
    DELETED: "Loan Deleted successfully",
    INVALID_LOAN_ID: "Loan not found",
  },
  TRANSACTION: {
    DCREATED: "Deposit created successfully",
    WCREATED: "Withdrawal created successfully",
    DFETCHED: "Deposits fetched successfully",
    WFETCHED: "Withdrawals fetched successfully",
    FETCHED: "Transactions fetched successfully",
    INSUFFICIENT: "Insufficient account balance",
    CONFIRM: {
      TRANSACTION: "Transaction has been confirmed",
      DEPOSIT: {
        APPROVED: "Deposit has been approved",
        REJECTED: "Deposit has been rejected",
      },
      WITHDRAWAL: {
        APPROVED: "Withdrawal has been approved",
        REJECTED: "Withdrawal has been rejected",
      },
    },
  },
  TOKEN: {
    EXPIRED: "Expired token, Unauthorized User",
    UNAUTHORIZED: "User not Found, Unauthorized user",
    NOTFOUND: "Authentication token missing",
  },
};
