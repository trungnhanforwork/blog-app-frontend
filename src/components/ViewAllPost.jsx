import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  return (
    <section className="m-auto max-w-lg my-10 px-6">
      <Link
        to="/posts"
        className="block bg-black text-white text-center py-4 px-6 rounded-full hover:bg-gray-800"
      >
        View All Posts
      </Link>
    </section>
  );
};
export default ViewAllJobs;
