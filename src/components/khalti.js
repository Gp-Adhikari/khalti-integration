import React, { useState, useEffect } from "react";
import styles from "../scss/khalti.module.css";

import khaltiLogo from "../img/khaltiLogo.svg";
import closeIcon from "../img/close.svg";

const Khalti = ({ display = false, amount = 10, config }) => {
  const [displayKhalti, setDisplayKhalti] = useState(display);

  const amt = amount / 100;

  const [phNumber, setPhNumber] = useState("9876543210");
  const [checkNumber, setCheckNumber] = useState(false);

  const [pin, setPin] = useState("1234");
  const [checkPin, setCheckPin] = useState(false);

  //set background scroll status
  useEffect(() => {
    if (displayKhalti) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [displayKhalti]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if number is empty
    if (phNumber === "") {
      setCheckNumber("empty");
      return;
    }

    //check if number length is less than or greater than 10
    if (phNumber.length < 10 || phNumber.length > 10) {
      setCheckNumber("invalid");
      return;
    }

    //set check to false
    setCheckNumber(false);

    //check if pin is empty or pin length is 0
    if (pin === "" || pin.length === 0) {
      setCheckPin("empty");
      return;
    }

    //set check to false
    setCheckPin(false);

    //fetch request
    const request = await fetch("https://khalti.com/api/v2/payment/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      body: JSON.stringify({
        public_key: config.public_key,
        mobile: String(phNumber),
        transaction_pin: String(pin),
        amount: amount,
        product_identity: config.product_identity,
        product_name: config.product_name,
        product_url: config.product_url === undefined ? "" : config.product_url,
      }),
    });

    const response = await request.json();
    console.log(response);
  };

  return (
    <div
      className={
        displayKhalti ? `${styles.block} ${styles.wrapper}` : `${styles.none}`
      }
    >
      <div
        className={styles.bg}
        onClick={() => setDisplayKhalti(!displayKhalti)}
      ></div>
      <div className={styles.container}>
        <div className={styles.heading}>
          <img src={khaltiLogo} alt="khalti" className={styles.logo} />
          <img
            src={closeIcon}
            alt="close"
            onClick={() => setDisplayKhalti(!displayKhalti)}
            className={styles.close}
          />
        </div>

        <form action="#" onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.input}>
            <p className={styles.label}>Phone Number</p>
            <input
              type="text"
              value={phNumber}
              onChange={(e) => {
                setPhNumber(e.target.value);
              }}
            />
            {checkNumber === "empty" ? (
              <p className={styles.formError}>*This field is Empty.</p>
            ) : checkNumber === "invalid" ? (
              <p className={styles.formError}>*Invalid Phone Number.</p>
            ) : null}
          </div>
          <div className={styles.input}>
            <p className={styles.label}>PIN</p>
            <input
              type="text"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
              }}
            />

            {checkPin === "empty" ? (
              <p className={styles.formError}>*This field is Empty.</p>
            ) : null}
          </div>

          <div className={styles.btnWrapper}>
            <button onClick={(e) => handleSubmit(e)}>Pay Rs.{amt}/-</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Khalti;
