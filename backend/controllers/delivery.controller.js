import AssignedDels from "../models/assignedDels.model.js";
import Delivery from "../models/deliveries.model.js";


export const addDelivery = async (req, res) => {
    const { carId, name, model, owner_email, owner_name, address, category, image } = req.body;
  
    // Use a 400 status code for missing fields
    if (!carId || !name || !model || !owner_email || !owner_name || !address || !category || !image) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
    }
  
    try {
        const newDelivery = new Delivery({ carId, name, model, owner_email, owner_name, address, category, image });
        await newDelivery.save();
        res.status(201).json({ success: true, message: "Rent successfully" });
    } catch (err) {
        console.error("Error while saving delivery:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

  
export const getDeliveries = async (req, res) => {
      try {
        const delivery = await Delivery.find(); // Fetch all delivery from the database
        res.status(200).json({ success: true, delivery });
      } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
};

export const deleteDelivery = async (req, res) => {
      const { id } = req.params;
      try {
        await Delivery.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Delivery Deleted" });
      } catch (err) {
        res.status(500).json({ success: false, message: "Delete Failed!" });
      }
};

export const getDelivery = async (req,res) => {
  const { id } = req.params; 
  try {
    const delivery = await Delivery.findById(id);
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const updateDelivery = async (req, res) => {
  const { id } = req.params; // Get the user ID from URL params
  const { carId, name, model, owner_email, owner_name, address, category, image } = req.body;
  
  try {
    const delivery = await Delivery.findByIdAndUpdate(id, {
      carId,
      name,
      model,
      owner_email,
      owner_name,
      address,
      category,
      image
    }, { new: true });

    if (!delivery) {
      return res.status(404).json({ success: false, message: "delivery not found" });
    }

    // Respond with the updated delivery data
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const assignDelivery = async (req, res) => {
  const { carId, name, model, owner_email, owner_name, address, delPersonEmail, delPersonName, image, delStatus } = req.body;

  if (!carId || !name || !model || !owner_email || !owner_name || !address || !delPersonEmail || !delPersonName || !image) {
      return res.status(400).json({ success: false, message: "Please Provide All Fields" });
  }

  try {
      const assignDelivery = new AssignedDels({ carId, name, model, owner_email, owner_name, address, delPersonEmail, delPersonName, image, delStatus: "Assigned" });
      await assignDelivery.save();
      res.status(201).json({ success: true, message: "Assigned successfully" });
  } catch (err) {
      console.error("Error while assigning delivery:", err);
      res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAssignDeliveries = async (req, res) => {
  try {
    const delivery = await AssignedDels.find(); // Fetch all delivery from the database
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateAssignDeliveries = async (req, res) => {
  const { id } = req.params;  
  const { delStatus } = req.body; 

  try {

    const delivery = await AssignedDels.findByIdAndUpdate(
      id,
      { delStatus }, // Only update the delStatus field
      { new: true }  // Return the updated delivery
    );
    if (!delivery) {
      return res.status(404).json({ success: false, message: "Delivery not found" });
    }
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    console.error("Error updating delivery:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteAssignDelivery = async (req, res) => {
  const { id } = req.params;
  try {
    await AssignedDels.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Delivery Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};
