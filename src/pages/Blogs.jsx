import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaPenFancy,
  FaImage,
  FaTimes,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useNotification } from "../context/NotificationProvider";

const Blogs = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { triggerNotification } = useNotification();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [donationName, setDonationName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [tags, setTags] = useState("");
  const [distributedItems, setDistributedItems] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [authorName, setAuthorName] = useState("");

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [images, setImages] = useState([
    { file: null, preview: null },
    { file: null, preview: null },
    { file: null, preview: null },
  ]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const updatedImages = [...images];
      updatedImages[index] = { file, preview };
      setImages(updatedImages);
    }
  };

  // const handleAddBlog = async () => {
  //   if (title.trim() && content.trim()) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("title", title);
  //       formData.append("content", content);
  //       formData.append("donationName", donationName);
  //       formData.append("author", authorName);

  //       formData.append(
  //         "tags",
  //         JSON.stringify(tags.split(",").map((t) => t.trim()))
  //       );
  //       formData.append(
  //         "distributedItems",
  //         JSON.stringify(distributedItems.split(",").map((item) => item.trim()))
  //       );
  //       formData.append("isFeatured", isFeatured);

  //       images.forEach((imgObj) => {
  //         if (imgObj.file) {
  //           formData.append("images", imgObj.file);
  //         }
  //       });

  //       const res = await axios.post(
  //         "http://localhost:5000/api/blogs/",
  //         formData,
  //         {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         }
  //       );

  //       setBlogs([res.data.blog, ...blogs]);
  //       setTitle("");
  //       setContent("");
  //       setDonationName("");
  //       setAuthorName("");
  //       setImages([
  //         { file: null, preview: null },
  //         { file: null, preview: null },
  //         { file: null, preview: null },
  //       ]);
  //       triggerNotification("Blog published successfully!", "success");
  //     } catch (err) {
  //       console.error("Blog creation error:", err);
  //       triggerNotification(
  //         err.response?.data?.error || "Blog upload failed.",
  //         "error"
  //       );
  //     }
  //   }
  // };

  const handleAddBlog = async () => {
    if (title.trim() && content.trim()) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("donationName", donationName);
        formData.append("author", authorName);
        formData.append(
          "tags",
          JSON.stringify(tags.split(",").map((t) => t.trim()))
        );
        formData.append(
          "distributedItems",
          JSON.stringify(distributedItems.split(",").map((item) => item.trim()))
        );
        formData.append("isFeatured", isFeatured);

        images.forEach((imgObj) => {
          if (imgObj.file) {
            formData.append("images", imgObj.file);
          }
        });

        const res = await axios.post(
          `${baseURL}/blogs/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setBlogs([res.data.blog, ...blogs]);

        // ✅ Reset all fields
        setTitle("");
        setContent("");
        setDonationName("");
        setAuthorName("");
        setTags("");
        setDistributedItems("");
        setIsFeatured(false);
        setImages([
          { file: null, preview: null },
          { file: null, preview: null },
          { file: null, preview: null },
        ]);

        triggerNotification("Blog published successfully!", "success");
      } catch (err) {
        console.error("Blog creation error:", err);
        triggerNotification(
          err.response?.data?.error || "Blog upload failed.",
          "error"
        );
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
      setSelectedBlog(null);
      triggerNotification("Blog deleted successfully", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      triggerNotification("Failed to delete blog", "error");
    }
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      await handleDelete(blogToDelete._id);
      setShowDeleteConfirm(false);
      setBlogToDelete(null);
    }
  };

  const handleUpdate = async () => {
    if (selectedBlog) {
      try {
        const updated = await axios.put(
          `${baseURL}/blogs/${selectedBlog._id}`,
          {
            title: selectedBlog.title,
            content: selectedBlog.content,
            donationName: selectedBlog.donationName,
          }
        );
        setBlogs(
          blogs.map((b) => (b._id === selectedBlog._id ? updated.data.blog : b))
        );
        setSelectedBlog(null);
        triggerNotification("Blog updated successfully!", "success");
      } catch (err) {
        console.error("Update failed:", err);
        // alert("Failed to update blog");
        triggerNotification("Failed to update blog", "error");
      }
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs/`);
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();

    return () => {
      images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
    };
  }, []);

  return (
    // <div className="min-h-screen py-6 px-3">
    <div className="space-y-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl border border-white/40 shadow-md h-fit sticky top-6">
          <h2 className="text-xl font-bold text-[#FF5E3A] mb-4 flex items-center gap-2">
            <FaPenFancy className="text-[#FF5E3A]" />
            New Blog
          </h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Blog title"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5E3A] bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Write something..."
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-[#FF5E3A] bg-white"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="text"
              placeholder="Donation name"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5E3A] bg-white"
              value={donationName}
              onChange={(e) => setDonationName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5E3A] bg-white"
              onChange={(e) => setTags(e.target.value)}
            />

            <input
              type="text"
              placeholder="Items Distributed (comma separated)"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5E3A] bg-white"
              onChange={(e) => setDistributedItems(e.target.value)}
            />
            <input
              type="text"
              placeholder="Author name"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FF5E3A] bg-white"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#FF5E3A] border-gray-300 rounded focus:ring-[#FF5E3A]"
              />
              <label htmlFor="isFeatured" className="text-sm text-gray-700">
                Mark as Featured
              </label>
            </div>

            <div className="grid grid-cols-3 pt-4 gap-2">
              {images.map((imgObj, index) => (
                <label
                  key={index}
                  className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-2 flex items-center justify-center bg-white hover:border-[#FF5E3A] transition relative overflow-hidden h-[70px]"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                  {imgObj.preview ? (
                    <img
                      src={imgObj.preview}
                      alt={`preview-${index}`}
                      className="object-cover w-full h-full rounded-md"
                    />
                  ) : (
                    <FaImage className="text-xl text-gray-400" />
                  )}
                </label>
              ))}
            </div>
            <button
              onClick={handleAddBlog}
              className="w-full bg-[#FF5E3A] text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-[#e14f2e] transition"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#FF5E3A] mb-2">
            Latest Blogs
          </h2>
          {blogs.length === 0 ? (
            <p className="text-gray-500 italic">
              No blogs yet — write your first!
            </p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <h3
                    className="text-xl font-semibold text-[#1C1F1D] mb-2 cursor-pointer"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setIsEditMode(false); // 👈 for viewing
                    }}
                  >
                    {blog.title}
                  </h3>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setIsEditMode(true); // 👈 Enter edit mode
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setBlogToDelete(blog);
                        setShowDeleteConfirm(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-3 line-clamp-3">
                  {blog.content}
                </p>
                {blog.images?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {blog.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`blog-img-${i}`}
                        className="rounded-md object-cover w-full h-[70px]"
                      />
                    ))}
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <FaUserCircle /> {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl border border-gray-200 transition-all duration-300">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              onClick={() => {
                setSelectedBlog(null);
                setIsEditMode(false);
              }}
            >
              <FaTimes size={22} />
            </button>

            {isEditMode ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Edit Blog
                </h2>
                <input
                  type="text"
                  value={selectedBlog.title}
                  onChange={(e) =>
                    setSelectedBlog({ ...selectedBlog, title: e.target.value })
                  }
                  className="w-full text-lg font-semibold border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
                />
                <textarea
                  value={selectedBlog.content}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      content: e.target.value,
                    })
                  }
                  className="w-full text-base border border-gray-300 rounded-lg px-4 py-2 mb-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
                />
                <input
                  value={selectedBlog.donationName}
                  onChange={(e) =>
                    setSelectedBlog({
                      ...selectedBlog,
                      donationName: e.target.value,
                    })
                  }
                  placeholder="Donation name"
                  className="w-full text-sm italic border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FF5E3A]"
                />
                <button
                  onClick={handleUpdate}
                  className="w-full bg-[#FF5E3A] text-white py-2.5 rounded-lg text-lg font-semibold hover:bg-[#e14f2e] transition shadow-md"
                >
                  Update Blog
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2 text-gray-800">
                  {selectedBlog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  By <span className="font-medium">{selectedBlog.author}</span>{" "}
                  • {new Date(selectedBlog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-5">
                  {selectedBlog.content}
                </p>

                {selectedBlog.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-sm mb-2">
                    {selectedBlog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-600 px-2 py-1 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {selectedBlog.distributedItems?.length > 0 && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Items Distributed:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedBlog.distributedItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedBlog.isFeatured && (
                  <span className="inline-block mt-3 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    Featured
                  </span>
                )}

                {selectedBlog.images?.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {selectedBlog.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`modal-img-${i}`}
                        className="rounded-xl object-cover w-full h-[180px] shadow"
                      />
                    ))}
                  </div>
                )}

                {selectedBlog.donationName && (
                  <p className="text-sm italic text-[#FF5E3A] font-medium">
                    Donation Campaign: {selectedBlog.donationName}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {showDeleteConfirm && blogToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Are you sure you want to delete this blog?
            </h3>
            <p className="text-gray-600 mb-6">{blogToDelete.title}</p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setBlogToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
