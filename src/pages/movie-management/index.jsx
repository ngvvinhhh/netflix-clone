import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadFile from "../../utils/upload";
import { render } from "react-dom";

function MovieManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = useForm();

  function handleShowModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleSubmitModal() {
    form.submit();
    setIsOpen(false);
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const colunm = [
    {
      title: "Movie name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Poster Path",
      dataIndex: "poster_path",
      key: "poster_path",
      render: (poster_path) => <Image src={poster_path} width={200} />,
    },
    {
      title: "Backdrop Path",
      dataIndex: "backdrop_path",
      key: "backdrop_path",
    },
    {
      title: "Trailer",
      dataIndex: "trailer",
      key: "trailer",
    },
    {
      title: "Catagory",
      dataIndex: "catagory",
      key: "catagory",
    },
  ];

  const fetchMovies = async () => {
    const response = await axios.get("https://6628fc2a54afcabd0737b641.mockapi.io/Movie");

    setDataSource(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    console.log(values.poster_path.file.originFileObj);
    const url = await uploadFile(values.poster_path.file.originFileObj);
    values.poster_path = url;
    console.log(values);

    const response = await axios.post("https://6628fc2a54afcabd0737b641.mockapi.io/Movie", values);
    console.log(response);
    setDataSource([...dataSource, values]);
    form.resetFields();
    handleCloseModal();
    toast.success("Add new movies successfully!");
  };

  const [dataSource, setDataSource] = useState([]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div>
      <Button type="primary" onClick={handleShowModal}>
        Add new Movies
      </Button>
      <Table columns={colunm} dataSource={dataSource} />
      <Modal open={isOpen} onCancel={handleCloseModal} onOk={handleSubmitModal} title="Add new Movies">
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Movie name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Discription" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Trailer" name="trailer">
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="catagory">
            <Input />
          </Form.Item>
          <Form.Item label="Poster Path" name="poster_path">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          {/* <Form.Item label="Backdrop Path" name="backdrop_path">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item> */}
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default MovieManagement;
