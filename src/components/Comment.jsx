import React from "react";

const Comment = ({ comment }) => {
  const updateTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  const updatedTime = updateTime(comment.updated_at);
  return (
    <section className="bg-white dark:bg-gray-900 py-4 lg:py-4 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <img
                  className="h-8 w-8 rounded-full mr-3"
                  src="/profile.png"
                  alt=""
                  width={40}
                  height={40}
                />
                {comment.user}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time title={updatedTime}>{updatedTime}</time>
              </p>
            </div>
            <button
              id="dropdownComment1Button"
              data-dropdown-toggle="dropdownComment1"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <span className="sr-only">Comment settings</span>
            </button>

            <div
              id="dropdownComment1"
              className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownMenuIconHorizontalButton"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Remove
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Report
                  </a>
                </li>
              </ul>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            {comment.description}
          </p>
        </article>
      </div>
    </section>
  );
};

export default Comment;
