import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import SelectCountry from "./SelectCountry";
import { colors } from "../tokens.stylex";
const styles = stylex.create({
  display: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "60VH",
  },
  label: {
    height: "90%",
    fontSize: "larger",
    color: "#898989",
    height: "65%",
    paddingLeft: "5%",
  },
  input: { border: 0, outline: 0, height:"50%",fontSize:"larger",paddingLeft:"5%" },
  inputs: {
    border: `2px solid rgb(176,176,176)`,
    width: "40vw",
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    // paddingBottom: "4%",
},
wrapper: {
    width: "100%",
    borderBottom: `2px solid rgb(176,176,176)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "10vh",
},
topWrapper: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
},
BottomWrapper: {
      paddingBottom: "1%",
    borderBottom: 0,
  },
});
const AddressForm = ({ initialAddress }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <SelectCountry register={register} />
      </div>
      <div {...stylex.props(styles.inputs)}>
        <div {...stylex.props(styles.wrapper, styles.topWrapper)}>
          <div {...stylex.props(styles.label)}>Street Name</div>
          <input
            defaultValue={initialAddress?.route ? initialAddress.route : ""}
            {...stylex.props(styles.input)}
            {...register("streetName", {
              required: "Street name is required",
            })}
          />
          {errors.streetAddress && (
            <p className="error">{errors.streetAddress.message}</p>
          )}
        </div>
        <div {...stylex.props(styles.wrapper, styles.topWrapper)}>
          <div {...stylex.props(styles.label)}>house number</div>
          <input
            defaultValue={
              initialAddress?.streetNumber ? initialAddress.streetNumber : ""
            }
            {...stylex.props(styles.input)}
            {...register("houseNumber", {
              required: "house number is required",
            })}
          />
          {errors.streetAddress && (
            <p className="error">{errors.streetAddress.message}</p>
          )}
        </div>

        <div {...stylex.props(styles.wrapper)}>
          <div {...stylex.props(styles.label)}>city/town/village</div>
          <input
            defaultValue={initialAddress?.city ? initialAddress.city : ""}
            {...stylex.props(styles.input)}
          />
        </div>

        <div {...stylex.props(styles.wrapper)}>
          <div {...stylex.props(styles.label)}>
            province/state/territory (if applicable)
          </div>
          <input
            defaultValue={
              initialAddress?.administrative_area_level_1
                ? initialAddress.administrative_area_level_1
                : ""
            }
            {...stylex.props(styles.input)}
            {...register("province", {})}
          />
        </div>

        <div {...stylex.props(styles.wrapper, styles.BottomWrapper)}>
          <div {...stylex.props(styles.label)}>postal code (if applicable)</div>
          <input
            {...stylex.props(styles.input)}
            {...register("postalCode", {})}
          />
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
