const BuyForm = () => {
  return (
    <form
      action=""
      className="min-w-[440px] min-h-[560px] bg-yellow-100 rounded-2xl border border-black border-opacity-10 shadow flex flex-col items-center"
    >
      <label htmlFor="" className="mt-2 mb-2">
        Personal details
      </label>
      <input
        type="text"
        placeholder="Name"
        className="bg-yellow-200 w-4/5 rounded-md mb-4"
      />
      <input
        type="tel"
        placeholder="Phone number"
        className="bg-yellow-200 w-4/5 rounded-md mb-4"
      />
      <input
        type="text"
        placeholder="Delivery address"
        className="bg-yellow-200 w-4/5 rounded-md mb-4"
      />
      <input
        type="email"
        placeholder="E-mail"
        className="bg-yellow-200 w-4/5 rounded-md mb-4"
      />
      <label htmlFor="" className="mb-2">
        Credit card details
      </label>
      <div className="w-3/4 h-40 bg-green-600 rounded-xl mb-6">
        <div className="flex">
          <div className="min-w-[40px] h-8 bg-yellow-200 rounded-md mt-6 mx-2 flex items-center justify-center">
            <span>logo</span>
          </div>
          <input
            type="number"
            placeholder="Card number"
            className="bg-yellow-200 w-4/5 h-8 rounded-md mt-6 mb-4"
          />
        </div>
        <div className="flex items-center justify-center">
          <label htmlFor="" className="mt-2 mr-1">
            VALID:
          </label>
          <input
            type="namber"
            placeholder="Valid Thru"
            className="bg-yellow-200 w-[100px] h-6 rounded-md mt-6 mb-4"
          />
          <label htmlFor="" className="mt-2 mr-1 ml-4">
            CVV:
          </label>
          <input
            type="number"
            placeholder="Code"
            className="bg-yellow-200 w-[80px] h-6 rounded-md mt-6 mb-4"
          />
        </div>
      </div>
      <button className="bg-gray-400 w-2/4 opacity-75 rounded-md h-10 transition-all hover:opacity-100">
        Confirm
      </button>
    </form>
  );
};

export default BuyForm;
