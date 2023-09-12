import CardWide from "../components/Card/CardWide";
import images from "../utils/images";
import { blogs } from "../data/blog-posts";
import Card from "../components/Card/Card";

const Home = () => {
  return (
    <main>
      <div className="container">
        <section className="featured-sc bg-creme">
          <CardWide blogItemData={blogs[0]} />
        </section>
      </div>
      <section className="recent-sc">
        <div className="container">
          <div className="recent-content">
            <div className="section-head flex items-end justify-between">
              <div className="sc-head-l">
                <h4 className="title title-lg">Popular Articles</h4>
                <p className="text text-base">Share trends, ideas, opinions.</p>
              </div>
              <div className="sc-head-r">
                <button className="btn btn-o-primary">
                  All
                  <span className="btn-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="card-list grid-cols grid-cols-2">
              {blogs.slice(1, 3).map((blogItem) => {
                return (
                  <Card
                    key={blogItem.id}
                    blogItemData={blogItem}
                    showContent={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="case-sc">
        <div className="container">
          <div className="case-content">
            <div className="section-head flex items-end justify-between">
              <div className="sc-head-l">
                <h4 className="title title-lg">Case studies</h4>
                <p className="text text-base">Share trends, ideas, opinions.</p>
              </div>
              <div className="sc-head-r">
                <button className="btn btn-o-primary">
                  All
                  <span className="btn-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <CardWide blogItemData={blogs[7]} />
          </div>
        </div>
      </section>
      <section className="all-sc">
        <div className="container">
          <div className="popular-content">
            <div className="section-head flex items-end justify-between">
              <div className="sc-head-l">
                <h4 className="title title-lg">All Articles</h4>
                <p className="text text-base">Share trends, ideas, opinions.</p>
              </div>
              <div className="sc-head-r">
                <button className="btn btn-o-primary">
                  All
                  <span className="btn-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="card-list grid-cols grid-cols-2">
              {blogs.slice(7, 9).map((blogItem) => {
                return (
                  <Card
                    key={blogItem.id}
                    blogItemData={blogItem}
                    showContent={true}
                  />
                );
              })}
            </div>
            <div className="card-list grid-cols grid-cols-3">
              {blogs.slice(9, 12).map((blogItem) => {
                return (
                  <Card
                    key={blogItem.id}
                    blogItemData={blogItem}
                    isCardSm={true}
                  />
                );
              })}
            </div>

            <div className="flex justify-center section-btn">
              <button className="btn btn-o-primary">All
              <span className="btn-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16">
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                      />
                    </svg>
                  </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      <div className="newsletter-curve">
        <img src={`${images.newsletter_wave}`} alt="" />
      </div>

      <section className="newsletter-sc bg-blue-dark text-creme">
        <div className="container">
          <div className="newsletter-content grid-cols grid-cols-2 items-center">
            <div className="newsletter-l">
              <h3 className="title title-lg">
                Get stories delivered from us to you
              </h3>
              <form action="" className="newsletter-form">
                <div className="form-group flex items-stretch">
                  <input type="email" className="form-input" />
                  <button type="submit" className="btn btn-primary nowrap"></button>
                </div>
                <p className="text text-base text-creme">
                  Get a response tomorrow if you submit today
                </p>
              </form>
            </div>
            <div className="newsletter-r">
              <div className="newsletter-info">
                <div className="newsletter-info-wrapper bg-creme">
                  <div className="info-img">
                    <img src={`${images.newsletter}`} alt="" className="object-fit-covert" />
                    <div className="info-text">
                      <h4 className="text-xxl text title">
                        Best articles of the week
                      </h4>
                      <p className="text text-lg">
                        Everywhere, anywhere, anyprice
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </main>
  );
};

export default Home;
