import Vehicle from "../models/vehicle.model.js";



//vehicle
export const addVehicle = async (req, res) => {
    const { name, model, seats, milage,price, category,image } = req.body;
  
    if (!name || !model || !seats || !milage || !price || !category || !image) {
      return res.status(200).json({ success: false, message: "Please Provide All Fields" });
    }
  
    try {
      const newVehicle = new Vehicle({ name, model, seats, milage, price, category,image});
      await newVehicle.save();
      res.status(201).json({ success: true, message: "Car Added successfully" });
  
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  
  }
  
  export const getVehicles = async (req, res) => {
    const { minMileage, excludeCategory, category, seats } = req.query;

    try {
        let filter = {};

        // Filter by mileage
        if (minMileage) {
            filter.milage = { $gte: parseInt(minMileage) };
        }

        // Filter by category (Include SUVs, sedans, etc.)
        if (category) {
            filter.category = { $in: Array.isArray(category) ? category : [category] };
        }

        // Exclude categories properly
        if (excludeCategory) {
            const categoriesToExclude = Array.isArray(excludeCategory) ? excludeCategory : [excludeCategory];
            filter.category = { ...(filter.category || {}), $nin: categoriesToExclude };
        }

        // Filter by seat count
        if (seats) {
            filter.seats = { $gte: parseInt(seats) };
        }

        console.log("🔍 Backend Filter Applied:", JSON.stringify(filter, null, 2));

        // Fetch vehicles based on the filter
        const vehicles = await Vehicle.find(filter);

        res.status(200).json({ success: true, vehicles });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


  
  
  
  export const getVehicle = async (req,res) => {
    const { id } = req.params; 
    try {
      const vehicle = await Vehicle.findById(id);
      res.status(200).json({ success: true, vehicle });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  export const updateVehicle = async (req, res) => {
    const { id } = req.params; // Get the user ID from URL params
    const { name, model, seats, milage,price, category,image } = req.body; // Extract the updated data from request body
    
    try {
      // Find the user by ID and update their details
      const vehicle = await Vehicle.findByIdAndUpdate(id, {
        name,
        model,
        seats,
        milage,
        price,
        category,
        image
      }, { new: true }); // `new: true` ensures the returned user is the updated version
  
      if (!vehicle) {
        return res.status(404).json({ success: false, message: "Vehicle not found" });
      }
  
      // Respond with the updated vehicle data
      res.status(200).json({ success: true, vehicle });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

  export const deleteVehicle = async (req, res) => {
  const { id } = req.params;
  try {
    await Vehicle.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Vehicle Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};
