import React, { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import "./index.css";
import camera from "../../assets/camera.svg";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const onSubmit = (values) => {
  console.log(values);
};

export default function EditSpot({ history }) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const [thumbnail, setThumbnail] = useState("");
  const [hostel, sethostel] = useState("");
  const [beds, setbeds] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function loadSpot() {
      const spot_id = localStorage.getItem("spot");
      const response = await api.get(`/spot/${spot_id}`);

      sethostel(response.data.hostel);
      setbeds(response.data.beds);
      setPrice(response.data.price);
    }
    loadSpot();
  }, []);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handlesubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");
    const spot_id = localStorage.getItem("spot");

    data.append("thumbnail", thumbnail);
    data.append("hostel", hostel);
    data.append("beds", beds);
    data.append("price", price);

    await api.put(`/spot/${spot_id}`, data, {
      headers: { user_id },
    });
    history.push("/dashboard");
  }
  return (
    <>
      <form onSubmit={(handlesubmit, formik.handleSubmit)}>
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
            value={(hostel, formik.values.hostel)}
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
            value={(hostel, formik.values.hostel)}
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
            value={(beds, formik.values.beds)}
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
            value={(beds, formik.values.beds)}
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
            value={(price, formik.values.price)}
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
            value={(price, formik.values.price)}
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
