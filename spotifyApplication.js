const express = require('express')
let alert = require('alert');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const port = process.env.PORT || 5001
let path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views')); //style with css
app.set('view engine', 'ejs')


function apiCall(reqOps) {
    return new Promise((resolve, reject) => {

        request(reqOps, (err, res, body) => {

            if (!err && res.statusCode == 200) {
                resolve(JSON.parse(body));

            }
            reject(err);
        });

    });
}

let apiKey = '' //obtain api key and place here
var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
};


app.get('/', function (req, res) {
    res.render('index');
})


app.post("/results", (req, res) => {
    let tableStr = ""
    let commonSongsTable = ""
    let numYears = 2 //default

    //years and pids input are arrays
    let year1 = req.body.n1[0]
    let pid1 = req.body.n2[0]

    let year2 = req.body.n1[1]
    let pid2 = req.body.n2[1]

    let year3 = req.body.n1[2]
    let pid3 = req.body.n2[2]

    let year4 = req.body.n1[3]
    let pid4 = req.body.n2[3]

    let data1, data2, data3, data4;

    playlistId = pid1
    var url = {
        url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=100&offset=0`,
        headers: headers
    };

    apiCall(url)
        .then(result => {    

            data1 = result;
            playlistId = pid2
            var url = {
                url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=100&offset=0`,
                headers: headers
            };

            return apiCall(url);


        })
        .then(result => {    
            data2 = result;

            if (pid3 != undefined) {
                numYears += 1

                playlistId = pid3
                var url = {
                    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=100&offset=0`,
                    headers: headers
                };

                return apiCall(url);
            }
        })
        .then(result => {    

            data3 = result;
            if (pid4 != undefined) {
                numYears += 1

                playlistId = pid4
                var url = {
                    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=US&limit=100&offset=0`,
                    headers: headers
                };

                return apiCall(url);
            }

        })
        .then(result => {     
            data4 = result;
            
            let a1 = ""
            let f1 = ""
            let a2 = ""
            let f2 = ""
            let a3 = ""
            let f3 = ""
            let a4 = ""
            let f4 = ""

            tableStr = ""
            tableStr2 = ""
            tableStr3 = ""
            tableStr4 = ""

            let s1 = []
            let s2 = []
            let s3 = []
            let s4 = []


            //parsing stuff
            if (pid1 != undefined) {
                tableStr = "<table style='display: inline-block; vertical-align: top;'>  "
                a1 = parseData(data1)[0]
                f1 = parseData(data1)[1]
                s1 = parseData(data1)[2]


                tableStr += "<tr > <th >" + year1 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td > Top Artists </td>"
                for (let i = 0; i < a1.length; i++) {
                    if (f1[i] > 1) {
                        tableStr += "<td > " + a1[i] + "</td>"
                    }
                }
                tableStr += "</tr>"

                tableStr += "<tr > <th >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td> Frequency </td>"
                for (let i = 0; i < f1.length; i++) {
                    if (f1[i] > 1) {
                        tableStr += "<td > " + f1[i] + "</td>"
                    }
                }
                tableStr += "</tr> </table>"
            }

            if (pid2 != undefined) {
                tableStr2 = "<table style='display: inline-block; vertical-align: top;'>  "

                a2 = parseData(data2)[0]
                f2 = parseData(data2)[1]
                s2 = parseData(data2)[2]


                tableStr2 += "<tr > <th >" + year2 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td > Top Artists </td>"
                for (let i = 0; i < a2.length; i++) {
                    if (f2[i] > 1) {
                        tableStr2 += "<td > " + a2[i] + "</td>"
                    }
                }
                tableStr2 += "</tr>"

                tableStr2 += "<tr > <th >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td> Frequency </td>"
                for (let i = 0; i < f2.length; i++) {
                    if (f2[i] > 1) {
                        tableStr2 += "<td > " + f2[i] + "</td>"
                    }
                }
                tableStr2 += "</tr></table>"
            }

            if (pid3 != undefined) {
                tableStr3 = "<table style='display: inline-block; vertical-align: top;'>  "

                a3 = parseData(data3)[0]
                f3 = parseData(data3)[1]
                s3 = parseData(data3)[2]


                tableStr3 += "<tr > <th >" + year3 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td > Top Artists </td>"
                for (let i = 0; i < a3.length; i++) {
                    if (f3[i] > 1) {
                        tableStr3 += "<td > " + a3[i] + "</td>"
                    }
                }
                tableStr3 += "</tr>"

                tableStr3 += "<tr > <th >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td> Frequency </td>"
                for (let i = 0; i < f3.length; i++) {
                    if (f3[i] > 1) {
                        tableStr3 += "<td > " + f3[i] + "</td>"
                    }
                }
                tableStr3 += "</tr></table>"
            }

            if (pid4 != undefined) {
                tableStr4 = "<table style='display: inline-block; vertical-align: top;'>  "

                a4 = parseData(data4)[0]
                f4 = parseData(data4)[1]
                s4 = parseData(data4)[2]


                tableStr4 += "<tr > <th > " + year4 + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td > Top Artists </td>"
                for (let i = 0; i < a4.length; i++) {
                    if (f4[i] > 1) {
                        tableStr4 += "<td > " + a4[i] + "</td>"
                    }
                }
                tableStr4 += "</tr>"

                tableStr4 += "<tr > <th > &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </th> <td> Frequency </td>"
                for (let i = 0; i < f4.length; i++) {
                    if (f4[i] > 1) {
                        tableStr4 += "<td > " + f4[i] + "</td>"
                    }
                }
                tableStr4 += "</tr></table>"


            }

            //total appearances by artists
            let mapping = new Map()
            for (let i = 0; i < a1.length; i++) {
                if (mapping.get(a1[i]) != undefined) {
                    let oldVal = mapping.get(a1[i])
                    mapping.set(a1[i], oldVal + f1[i])
                } else {
                    mapping.set(a1[i], f1[i])
                }
            }
            for (let i = 0; i < a2.length; i++) {
                if (mapping.get(a2[i]) != undefined) {
                    let oldVal = mapping.get(a2[i])
                    mapping.set(a2[i], oldVal + f2[i])
                } else {
                    mapping.set(a2[i], f2[i])
                }
            }
            for (let i = 0; i < a3.length; i++) {
                if (mapping.get(a3[i]) != undefined) {
                    let oldVal = mapping.get(a3[i])
                    mapping.set(a3[i], oldVal + f3[i])
                } else {
                    mapping.set(a3[i], f3[i])
                }
            }
            for (let i = 0; i < a4.length; i++) {
                if (mapping.get(a4[i]) != undefined) {
                    let oldVal = mapping.get(a4[i])
                    mapping.set(a4[i], oldVal + f4[i])
                } else {
                    mapping.set(a4[i], f4[i])
                }
            }
            //sort mapping by value
            mapping = new Map([...mapping.entries()].sort((a, b) => b[1] - a[1]));

            //top 10 overall artists
            topOverallArtists = []
            topAppearances = []
            let i = 0
            for (let [key, value] of mapping) {
                if (i < 10) { //top 10
                    i++
                    topOverallArtists.push(key)
                    topAppearances.push(mapping.get(key))
                }
            }

            //songs parsing
            g1234 = new Set()
            g123 = new Set()
            g124 = new Set()
            g134 = new Set()
            g234 = new Set()
            g12 = new Set()
            g13 = new Set()
            g14 = new Set()
            g23 = new Set()
            g24 = new Set()
            g34 = new Set()

            let len3 = s3.length
            let len4 = s4.length


            if (s3.length == 0) {
                len3 = 1
            }
            if (s4.length == 0) {
                len4 = 1
            }

            for (let i = 0; i < s1.length; i++) {
                for (let j = 0; j < s2.length; j++) {
                    for (let k = 0; k < len3; k++) {
                        for (let m = 0; m < len4; m++) {
                            if (s1[i] == s2[j] && s2[j] == s3[k] && s3[k] == s4[m]) {
                                g1234.add(s1[i])
                            } else if (s1[i] == s2[j] && s2[j] == s3[k]) {
                                g123.add(s1[i])
                            } else if (s1[i] == s2[j] && s2[j] == s4[m]) {
                                g124.add(s1[i])
                            } else if (s1[i] == s3[k] && s3[k] == s4[m]) {
                                g134.add(s1[i])
                            } else if (s2[j] == s3[k] && s3[k] == s4[m]) {
                                g234.add(s2[j])
                            } else if (s2[j] == s1[i]) {
                                g12.add(s2[j])
                            } else if (s3[k] == s1[i]) {
                                g13.add(s3[k])
                            } else if (s4[m] == s1[i]) {
                                g14.add(s4[m])
                            } else if (s2[j] == s3[k]) {
                                g23.add(s2[j])
                            } else if (s2[j] == s4[m]) {
                                g24.add(s2[j])
                            } else if (s3[k] == s4[m]) {
                                g34.add(s3[k])
                            }
                        }
                    }
                }
            }
            
            //g12 - g123
            g12 = new Set([...g12].filter(x => !g123.has(x))) 
            g12 = ([...g12].filter(x => !g124.has(x))) 

            g13 = new Set([...g13].filter(x => !g123.has(x)))
            g13 = ([...g13].filter(x => !g134.has(x)))

            g14 = new Set([...g14].filter(x => !g124.has(x)))
            g14 = ([...g14].filter(x => !g134.has(x)))

            g23 = new Set([...g23].filter(x => !g123.has(x)))
            g23 = ([...g23].filter(x => !g234.has(x)))

            g24 = new Set([...g24].filter(x => !g124.has(x)))
            g24 = ([...g24].filter(x => !g234.has(x)))

            g34 = new Set([...g34].filter(x => !g134.has(x)))
            g34 = ([...g34].filter(x => !g234.has(x)))

            g123 = new Set([...g123].filter(x => !g1234.has(x)))
            g123 = (Array.from(g123));
            g124 = new Set([...g124].filter(x => !g1234.has(x)))
            g124 = (Array.from(g124));
            g134 = new Set([...g134].filter(x => !g1234.has(x)))
            g134 = (Array.from(g134));
            g234 = new Set([...g234].filter(x => !g1234.has(x)))
            g234 = (Array.from(g234));
            g1234 = (Array.from(g1234));

            if (g34[0] == undefined) {
                g34 = []
            }

            commonSongsTable = "<table style='display: inline-block; vertical-align: top;'><tr> <th>Song</th>"

            for (let i = 0; i < g1234.length; i++) {
                commonSongsTable += "<td > " + g1234[i] + "</td>"
            }
            for (let i = 0; i < g123.length; i++) {
                commonSongsTable += "<td > " + g123[i] + "</td>"
            }
            for (let i = 0; i < g124.length; i++) {
                commonSongsTable += "<td > " + g124[i] + "</td>"
            }
            for (let i = 0; i < g134.length; i++) {
                commonSongsTable += "<td > " + g134[i] + "</td>"
            }
            for (let i = 0; i < g234.length; i++) {
                commonSongsTable += "<td > " + g234[i] + "</td>"
            }
            for (let i = 0; i < g12.length; i++) {
                commonSongsTable += "<td > " + g12[i] + "</td>"
            }
            for (let i = 0; i < g13.length; i++) {
                commonSongsTable += "<td > " + g13[i] + "</td>"
            }
            for (let i = 0; i < g14.length; i++) {
                commonSongsTable += "<td > " + g14[i] + "</td>"
            }
            for (let i = 0; i < g23.length; i++) {
                commonSongsTable += "<td > " + g23[i] + "</td>"
            }
            for (let i = 0; i < g24.length; i++) {
                commonSongsTable += "<td > " + g24[i] + "</td>"
            }
            for (let i = 0; i < g34.length; i++) {
                commonSongsTable += "<td > " + g34[i] + "</td>"
            }

            commonSongsTable += "</tr><tr><th>Wrapped Years</th>"

            for (let i = 0; i < g1234.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year2 + ", " + year3 + ", " + year4 + "</td>"
            }
            for (let i = 0; i < g123.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year2 + ", " + year3 + "</td>"
            }
            for (let i = 0; i < g124.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year2 + ", " + year4 + "</td>"
            }
            for (let i = 0; i < g134.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year3 + ", " + year4 + "</td>"
            }
            for (let i = 0; i < g234.length; i++) {
                commonSongsTable += "<td > " + year2 + ", " + year3 + ", " + year4 + "</td>"
            }
            for (let i = 0; i < g12.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year2 + "</td>"
            }
            for (let i = 0; i < g13.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year3 + "</td>"
            }
            for (let i = 0; i < g14.length; i++) {
                commonSongsTable += "<td > " + year1 + ", " + year4 + "</td>"
            }
            for (let i = 0; i < g23.length; i++) {
                commonSongsTable += "<td > " + year2 + ", " + year3 + "</td>"
            }
            for (let i = 0; i < g24.length; i++) {
                commonSongsTable += "<td > " + year2 + ", " + year4 + "</td>"
            }
            for (let i = 0; i < g34.length; i++) {
                commonSongsTable += "<td > " + year3 + ", " + year4 + "</td>"
            }

            commonSongsTable += "</tr>"
            commonSongsTable += "</table>"

            let totalSongs = s1.length + s2.length + s3.length + s4.length

            let variables = {
                p1: a1,
                p1f: f1,
                p2: a2,
                p2f: f2,
                p3: a3,
                p3f: f3,
                p4: a4,
                p4f: f4,
                tableStr: tableStr,
                tableStr2: tableStr2,
                tableStr3: tableStr3,
                tableStr4: tableStr4,
                commonSongsTable: commonSongsTable,
                numYears: numYears,

                topOverallArtists: topOverallArtists,
                topAppearances: topAppearances,
                totalSongs: totalSongs
            };

            res.render('results', variables);

        })
        .catch(err => {
            console.log("Error occured in one of the API calls: ", err);
            //("Invalid Playlist ID(s). Please try again.");

            res.redirect('back');
        });

    function parseData(info) {
        if (info == undefined) {
            return
        }

        songs = []
        artists = new Map()
        //let info = JSON.parse(body)


        for (let i = 0; i < info.items.length; i++) {
            if (info.items[i].track == null) { //if playlist has less than 100 songs
                break
            } else {
                let s = (info.items[i].track.name) + " "
                songs.push(s)
            }

            //console.log(info.items[i].track.album.release_date) //release date - use?

            for (let j = 0; j < info.items[i].track.artists.length; j++) {
                let a = (info.items[i].track.artists[j].name) + " "
                if (artists.get(a) != undefined) {
                    let oldVal = artists.get(a)
                    artists.set(a, oldVal + 1)
                } else {
                    artists.set(a, 1)
                }
            }
        }

        //sort artist map by freq
        artists = new Map([...artists.entries()].sort((a, b) => b[1] - a[1]));

        let highestArtists = []
        let highestArtistsFreq = []
        //if freq of artist is bigger than 1, add to list
        for (let [key, value] of artists) {
            highestArtists.push(key)
            highestArtistsFreq.push(artists.get(key))
            
        }
        return [highestArtists, highestArtistsFreq, songs]
    }
});

app.listen(port)
console.log('Web Application has started!');
