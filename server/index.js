const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const BucketListModel = require("./models/BucketList");
const { dbURL } = require("./config.js");

app.use(express.json());
app.use(cors());

mongoose.connect(
    `mongodb+srv://${dbURL}`,
    {
        useNewUrlParser: true,
    },
    {
        useUnifiedTopology: true,
    }
);

app.post("/insert", async (req, res) => {
    const itemName = req.body.itemName;
    const itemDescription = req.body.itemDescription;

    const BucketListItem = new BucketListModel({
        itemName: itemName,
        itemDescription: itemDescription,
    });

    try {
        await BucketListItem.save();
        res.send("inserted data");
    } catch (err) {
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    BucketListModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    });
});

app.put("/update", async (req, res) => {
    const newItemName = req.body.newItemName;
    const id = req.body.id;

    try {
        await BucketListModel.findById(id, (err, updatedItem) => {
            updatedItem.itemName = newItemName;
            updatedItem.save();
            res.send("update");
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await BucketListModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3001, () => {
    console.log("Server running on port 3001....");
});
