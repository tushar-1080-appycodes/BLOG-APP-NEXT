import { db } from "@/firebase/config";
import { getDocs, collection, writeBatch, doc, deleteDoc,updateDoc } from "firebase/firestore";

const fetchBlogs = async () => {
    const blogsCollection = collection(db, "blogs");
    const blogsSnapshot = await getDocs(blogsCollection);
    const blogsList = blogsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return blogsList
};

const uploadBlogs = async (blogs) => {
    try {
        const batch = writeBatch(db); // Create a batch

        blogs.forEach((blog) => {
            batch.set(doc(collection(db, "blogs")), blog);
        });

        await batch.commit(); // Execute the batch write
        console.log("✅ Bulk upload successful!");
    } catch (error) {
        console.error("❌ Error uploading blogs:", error);
    }
}

const updateBlog = async (blogID, data) => {
    const blogRef = doc(db, "blogs", blogID); // Reference to blog document
    await updateDoc(blogRef, data); // Update document
}

const deleteBlog = async (blogID) => {
    await deleteDoc(doc(db, "blogs", blogID))
}

export { fetchBlogs, uploadBlogs, deleteBlog, updateBlog } 