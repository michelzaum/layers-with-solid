DROP TABLE branas.installment;
DROP TABLE branas.transaction;

CREATE TABLE branas.transaction (
  code TEXT PRIMARY KEY,
  amount NUMERIC,
  number_installments INTEGER,
  paymentMethod TEXT,
  date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE branas.installment (
  code TEXT REFERENCES branas.transaction (code),
  number INTEGER,
  amount NUMERIC,
  PRIMARY KEY (code, number)
);