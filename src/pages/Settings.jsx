import React, { useRef } from "react";
import Card from "components/Card";
import FileUpload from "components/FileUpload";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "util/axios";

const Settings = () => {
  const toastId = useRef(null);
  const fileUploadRef = useRef();

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    toastId.current = toast.loading("Uploading file...", {
      autoClose: false,
      closeOnClick: false,
    });
    axios
      .post("/loans", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.update(toastId.current, {
          render: "File uploaded successful.",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
        });
        resetForm();
        fileUploadRef.current.handleClear();
      })
      .catch((err) => {
        console.error(err);
        toast.update(toastId.current, {
          render: err?.response.data.error || "File uploaded unsuccessful.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
        });
      });
    setSubmitting(false);
  };
  return (
    <Card title="Settings" backgroundColor="var(--magnolia)">
      <div className="py-3">
        <Formik initialValues={{ loan: "" }} onSubmit={handleSubmit}>
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <FileUpload
                name="loan"
                setFieldValue={setFieldValue}
                supportedFile={[".csv", ".xlsx"]}
                ref={fileUploadRef}
              />
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Upload
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Card>
  );
};

export default Settings;
