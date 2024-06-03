import React from "react";
import { useForm } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../tokens.stylex";
import { CiCalendar } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { CiCreditCard1 } from "react-icons/ci";
import { FaCreditCard, FaRegCreditCard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { bookApartment } from "../api";
import { formatStringForBackEnd } from "../../utils";
const styles = stylex.create({
  payment: {
    paddingTop: "5vh",
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "1rem",
  },
  inputIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: colors.bold,
  },
  inputs: { display: "flex", flexDirection: "column" },
  button: { width: "100px" },
  inputField: { display: "flex", flexDirection: "column" },
  creditInput: {
    height: "5vh",
    paddingLeft: "30px",
    width: "100%",
    border: `1px solid ${colors.bold}`,
    boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;",
  },
  dateInput: {
    height: "5vh",
    paddingLeft: "30px",
    width: "50%",
    paddingRight: "5vw",
    border: `1px solid ${colors.bold}`,
    boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;",
  },
  cvcInput: {
    height: "5vh",
    paddingLeft: "30px",
    width: "150%",
    margin: "0 auto",
    border: `1px solid ${colors.bold}`,
    boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;",
  },

  ownerInput: {
    height: "5vh",
    paddingLeft: "30px",
    width: "100%",
    border: `1px solid ${colors.bold}`,
    boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;",
  },

  cvcAndExp: { display: "flex", flexDirection: "row", width: "100%" },
});

const Payment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (payment) => {
    try {
      const { checkOut, checkIn } = JSON.parse(
        sessionStorage.getItem("booking")
      );
      const response = await bookApartment(
        params.id,
        payment,
        formatStringForBackEnd(checkIn),
        formatStringForBackEnd(checkOut)
      );
      if (response.status === 200) {
        navigate(`../sucssfullBooking/${params.id}`, {
          state: { data: response.data.apartment },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form {...stylex.props(styles.payment)} onSubmit={handleSubmit(onSubmit)}>
      <div {...stylex.props(styles.inputField)}>
        <label>Card Number:</label>
        <div {...stylex.props(styles.inputWrapper)}>
          <span {...stylex.props(styles.inputIcon)}>
            <CiCreditCard1 />
          </span>
          <input
            {...stylex.props(styles.creditInput)}
            placeholder="4444 3333 2222 1111"
            {...register("cardNumber", { required: "Card number is required" })}
            type="text"
          />
        </div>
        {errors.cardNumber && <div>{errors.cardNumber.message}</div>}
      </div>
      <div {...stylex.props(styles.cvcAndExp)}>
        <div {...stylex.props(styles.inputField)}>
          <label>Expiry Date:</label>
          <div {...stylex.props(styles.inputWrapper)}>
            <input
              {...stylex.props(styles.dateInput)}
              placeholder="30/03/28"
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
              type="text"
            />
            <span {...stylex.props(styles.inputIcon)}>
              <CiCalendar />
            </span>
          </div>
        </div>
        {errors.expiryDate && <div>{errors.expiryDate.message}</div>}
        <div {...stylex.props(styles.inputField)}>
          <label>CVC:</label>
          <div {...stylex.props(styles.inputWrapper)}>
            <input
              {...stylex.props(styles.cvcInput)}
              placeholder="333"
              {...register("cvc", { required: "CVC is required" })}
              type="text"
            />
            <span {...stylex.props(styles.inputIcon)}>
              <FaRegCreditCard />
            </span>
          </div>
        </div>
        {errors.cvc && <div>{errors.cvc.message}</div>}
      </div>
      <div {...stylex.props(styles.inputField)}>
        <label>Card Owner:</label>
        <div {...stylex.props(styles.inputWrapper)}>
          <input
            {...stylex.props(styles.ownerInput)}
            placeholder="john doe"
            {...register("cardOwner", { required: "Card owner is required" })}
            type="text"
          />
          <span {...stylex.props(styles.inputIcon)}>
            <RxAvatar />
          </span>
        </div>
        {errors.cardOwner && <div>{errors.cardOwner.message}</div>}
      </div>
      <button type="submit">submit</button>
    </form>
  );
};

export default Payment;
