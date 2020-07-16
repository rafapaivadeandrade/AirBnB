import React, { useState, useMemo } from "react";
import api from "../../services/api";
import "./index.css";
import camera from "../../assets/camera.svg";
import * as Yup from "yup";

import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  hostel: Yup.string().required("Required"),
  beds: Yup.string().required("Required"),
  price: Yup.number().min(1).nullable().typeError("You must specify a number"),
});

const initialValues = {
  hostel: "",
  beds: "",
  price: "",
};

export default function New({ history }) {
  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  const [thumbnail, setThumbnail] = useState("");
  const [hostel, sethostel] = useState("");
  const [beds, setbeds] = useState("");
  const [price, setPrice] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handlesubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");
    data.append("thumbnail", thumbnail);
    data.append("hostel", formik.values.hostel);
    data.append("beds", formik.values.beds);
    data.append("price", formik.values.price);

    await api.post("/spots", data, {
      headers: { user_id },
    });
    history.push("/dashboard");
  }
  return (
    <>
      <form onSubmit={handlesubmit}>
        <label
          id="thumbnail"
          style={{ backgroundImage: `url(${preview})` }}
          className={thumbnail ? "has-thumbnail" : ""}
        >
          <input
            type="file"
            onChange={(event) => setThumbnail(event.target.files[0])}
          />
          <img src={camera} alt="Select img" />
        </label>
        <label htmlFor="hostel">Hostel *</label>
        {formik.touched.hostel && formik.errors.hostel ? (
          <input
            id="hostel"
            placeholder="Your hostel"
            value={formik.values.hostel}
            onChange={
              ((event) => sethostel(event.target.value), formik.handleChange)
            }
            onBlur={formik.handleBlur}
            className="has-error"
          />
        ) : (
          <input
            id="hostel"
            placeholder="Your hostel"
            value={formik.values.hostel}
            onChange={
              ((event) => sethostel(event.target.value), formik.handleChange)
            }
            onBlur={formik.handleBlur}
          />
        )}

        {formik.touched.hostel && formik.errors.hostel ? (
          <div className="error">{formik.errors.hostel}</div>
        ) : null}

        <label htmlFor="beds">
          Beds *<span>(Separated by comma)</span>
        </label>

        {formik.touched.beds && formik.errors.beds ? (
          <input
            id="beds"
            placeholder="Which beds?"
            value={formik.values.beds}
            onChange={
              ((event) => setbeds(event.target.value), formik.handleChange)
            }
            onBlur={formik.handleBlur}
            className="has-error"
          />
        ) : (
          <input
            id="beds"
            placeholder="Which beds?"
            value={formik.values.beds}
            onChange={
              ((event) => setbeds(event.target.value), formik.handleChange)
            }
            onBlur={formik.handleBlur}
          />
        )}

        {formik.touched.beds && formik.errors.beds ? (
          <div className="error">{formik.errors.beds}</div>
        ) : null}
        <label htmlFor="price">
          Daily Price *<span>(Empty for free)</span>
        </label>
        {formik.errors.price ? (
          <input
            id="price"
            placeholder="Value per day"
            value={formik.values.price}
            onChange={
              ((event) => setPrice(event.target.value), formik.handleChange)
            }
            onBlur={formik.handleBlur}
            className="has-error"
          />
        ) : (
          <input
            id="price"
            placeholder="Value per day"
            value={formik.values.price}
            onChange={
              ((event) => setPrice(event.target.value), formik.handleChange)
            }
            onBlur={formik.handleBlur}
          />
        )}
        {formik.errors.price ? (
          <div className="error">{formik.errors.price}</div>
        ) : null}
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </>
  );
}
