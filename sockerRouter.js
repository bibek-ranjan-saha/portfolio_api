const express = require("express");
const Users = require('./models/user');

function SocketRouter(io) {
    const router = express.Router();

    router.use("/api", async (req, res) => {
        var data = await Users.find();
        if (data[0] != undefined) {

            await Users.findOneAndUpdate({ '_id': data[0]._id }, { $inc: { 'totalCount': 1 } });

            const result = await Users.findOneAndUpdate({ 'countries.name': req.body.country }, { $inc: { 'countries.$.count': 1 } });

            if (result) {

                const city = await Users.findOneAndUpdate({ 'cities.name': req.body.city }, { $inc: { 'cities.$.count': 1 } });

                if (city === null) {

                    data = await Users.updateOne({ "_id": data[0]._id },
                        {
                            "$push": {
                                "cities": {
                                    "name": req.body.city,
                                    "zip": req.body.zip,
                                    "count": 1
                                }
                            }
                        }
                    );

                }

                const regions = await Users.findOneAndUpdate({ 'regions.name': req.body.regionName }, { $inc: { 'regions.$.count': 1 } });

                if (regions === null) {

                    data = await Users.updateOne({ "_id": data[0]._id },
                        {
                            "$push": {
                                "regions": {
                                    "name": req.body.regionName,
                                    "code": req.body.region,
                                    "timeZone": req.body.timezone,
                                    "lat": req.body.lat,
                                    "long": req.body.lon,
                                    "count": 1
                                }
                            }
                        }
                    );

                }

                const serviceProviders = await Users.findOneAndUpdate({ 'serviceProviders.isp': req.body.isp }, { $inc: { 'serviceProviders.$.count': 1 } });

                if (serviceProviders === null) {

                    data = await Users.updateOne({ "_id": data[0]._id },
                        {
                            "$push": {
                                "serviceProvider": {
                                    "isp": req.body.isp,
                                    "org": req.body.org,
                                    "ip": req.body.query,
                                    "as": req.body.as,
                                    "count": 1
                                }
                            }
                        }
                    );

                }

                res.send(data[0]);
            }
            else {
                await Users.updateOne({ "_id": data[0]._id },
                    {
                        "$push": {
                            "countries": {
                                "name": req.body.country,
                                "code": req.body.countryCode,
                                "count": 1
                            }
                        }
                    });
                res.send(data[0]);
            }
            io.emit("dataUpdate", data[0]);
        }
        else {
            var result;
            const user = new Users;
            var country = {
                "name": req.body.country,
                "code": req.body.countryCode,
                "count": 1
            };
            var sp = {
                "isp": req.body.isp,
                "org": req.body.org,
                "ip": req.body.query,
                "as": req.body.as,
                "count": 1
            };
            var region = {
                "name": req.body.regionName,
                "code": req.body.region,
                "timeZone": req.body.timezone,
                "lat": req.body.lat,
                "long": req.body.lon,
                "count": 1
            };
            var city = {
                "name": req.body.city,
                "zip": req.body.zip,
                "count": 1
            };
            user.countries.push(country);
            user.cities.push(city);
            user.regions.push(region);
            user.serviceProviders.push(sp);

            user.save()
                .then(data => {
                    result = data;
                    res.json(result);
                })
                .catch(err => res.send(err));
            io.emit("dataUpdate", result);
        }

    });
    return router;
}

module.exports = SocketRouter;