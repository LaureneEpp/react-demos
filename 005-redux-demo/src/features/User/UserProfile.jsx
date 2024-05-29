const UserProfile = ({ authUser }) => {
  return (
    <div className="overflow-hidden h-full bg-neutral-100 py-24 sm:py-32 flex items-center">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="lg:max-w-lg bg-emerald-800 p-4 rounded shadow-xl">
          <div className="p-3">
            <h2 className="text-2xl font-semibold leading-7 text-purple-600">
              Your profile
            </h2>
            <div key={authUser.id} className="mt-8">
              <div className="flex flex-row items-center justify-around p-4">
                <img
                  src={authUser.img}
                  alt="avatar"
                  className="relative inline-block h-28 w-28 rounded-full  object-cover object-center"
                />
                <p className="mt-2 text-6xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {authUser.fullname}
                </p>
              </div>
              <p className="mt-6 text-lg leading-8 text-neutral-100 text-justify">
                {authUser.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
