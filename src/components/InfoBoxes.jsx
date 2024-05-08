import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 rounded-lg">
          {/* <InfoBox
            heading="For Reader"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Posts",
              link: "/",
              backgroundColor: "bg-black",
            }}
          >
            You are now a part of the community! Discover meaningful blogs the
            that suits your needs.
          </InfoBox> */}

          <InfoBox
            heading="For Blogger"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Blog",
              link: "/post/add",
              backgroundColor: "bg-blue-800",
            }}
          >
            Writing a Great Post Title Think of your post title as a super short
            description.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
