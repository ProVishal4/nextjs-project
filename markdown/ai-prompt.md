how to set chackbox value in setForm status my setup:-
status variable:- 
setForm({popular: false})
handle Change function set name into value:- 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
chackbox input:- 
  <div className="flex items-center">
                <input
                  type="checkbox"
                  id="popular"
                  name="popular"
                  checked={form.popular}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="popular"
                  className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Mark as Popular
                </label>
              </div>