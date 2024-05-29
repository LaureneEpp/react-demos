const UserProfile = ({ authUser }) => {
  return (
    <div className="overflow-hidden h-full bg-neutral-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-purple-600">
                Your profile
              </h2>
              <div key={authUser.id} className="mt-8">
                <img
                  src={authUser.img}
                  alt="avatar"
                  className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
                />
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {authUser.fullname}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {authUser.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
