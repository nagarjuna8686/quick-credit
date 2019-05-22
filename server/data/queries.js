// User model
const insertUser = `INSERT INTO users(firstName, lastName, email, password, address, status, isAdmin, createdOn, updatedOn)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;
const allUsers = 'SELECT * FROM users';
const getUserWithId = 'SELECT * FROM users WHERE id = $1';
const getUserWithEmail = 'SELECT * FROM users WHERE email = $1;';

// Loan model
const insertLoan = `INSERT INTO loans(userEmail, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest, updatedOn)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`;
const getLoan = 'SELECT * FROM loans WHERE id = $1';
const retrieveAllLoans = 'SELECT * FROM loans';
const repaidLoans = 'SELECT * FROM loans where status = $1 AND repaid = $2';
const approveOrRejectLoan = 'UPDATE loans SET status=$1, updatedOn=$2 WHERE id=$3 RETURNING *';


export default {
  insertUser,
  allUsers,
  getUserWithId,
  getUserWithEmail,
  insertLoan,
  getLoan,
  retrieveAllLoans,
  repaidLoans,
  approveOrRejectLoan,
};
