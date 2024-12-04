import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import Product from "../../models/Product.model";
import {
  fetchAllProducts,
  addNewProduct,
  modifyProduct,
} from "../../services/Product.service";

const ProductsAdmin: React.FC = () => {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  // Fetch all products using React Query
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  // Mutation for adding/updating a product
  const addOrEditMutation = useMutation({
    mutationFn: (product: Product) =>
      currentProduct
        ? modifyProduct(product.id, product) // Update
        : addNewProduct(product), // Add new
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowModal(false);
      setCurrentProduct(null);
    },
  });

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory = categoryFilter
      ? product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddOrEditProduct = (product: Product) => {
    addOrEditMutation.mutate(product);
  };

  const handleOpenModal = (product?: Product) => {
    setCurrentProduct(product || null);
    setShowModal(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-gray-800 text-white min-h-screen p-6 space-y-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard - Products</h1>

        <div className="flex space-x-4 mb-6 ">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 text-gray-950 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category Filter */}
          <input
            type="text"
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 text-gray-950 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Add Product Button */}
          <button
            onClick={() => handleOpenModal()}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className=" container overflow-auto h-[600px] bg-gray-900 rounded-lg shadow-lg   ">
          <table className="min-w-full text-sm text-left text-gray-200">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4">{product.id}</td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">₹{product.price}</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOpenModal(product)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black rounded-lg p-8 w-3/4 md:w-1/2 lg:w-1/3 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-6">
                {currentProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const formData = new FormData(e.target as HTMLFormElement);
                  const product: Product = {
                    id:
                      currentProduct?.id ||
                      `prod${Math.floor(Math.random() * 1000)}`,
                    name: formData.get("name") as string,
                    description: formData.get("description") as string,
                    price: parseFloat(formData.get("price") as string),
                    discount: parseInt(formData.get("discount") as string, 10),
                    category: formData.get("category") as string,
                    subCategory: (formData.get("subCategory") as string).split(
                      ","
                    ),
                    stock: parseInt(formData.get("stock") as string, 10),
                    images: [formData.get("images") as string],
                    ratings: { average: 4.5, count: 500 },
                    features: (formData.get("features") as string).split(","),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };

                  handleAddOrEditProduct(product);
                }}
              >
                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={currentProduct?.name || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={currentProduct?.name || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Price</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={currentProduct?.price || 0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      defaultValue={currentProduct?.stock || 0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Discount (%)</label>
                    <input
                      type="number"
                      name="discount"
                      defaultValue={currentProduct?.discount || 0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                      name="description"
                      defaultValue={currentProduct?.description || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">Category</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={currentProduct?.category || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700">
                      Sub-Category (comma separated)
                    </label>
                    <input
                      type="text"
                      name="subCategory"
                      defaultValue={
                        currentProduct?.subCategory?.join(",") || ""
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700">
                      Features (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="features"
                      defaultValue={currentProduct?.features.join(", ") || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700">
                      Product Images (URL)
                    </label>
                    <input
                      type="text"
                      name="images"
                      defaultValue={currentProduct?.images?.[0] || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                  >
                    {currentProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsAdmin;
