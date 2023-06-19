// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Deyplay{

 //Track struct
  struct Track {
        uint id;
        string title;
        address artist;
        string imageUrl;
        string audioFile;
        uint price;
        uint totalStreams;
        uint totalPurchases;
        address[] royaltiesOwners;
        uint[] royaltiesPercentages;
    }


    //Album struct
    struct Album {
        uint id;
        string title;
        address artist;
        string imageUrl;
        string description;
        uint price;
        uint totalStreams;
        uint totalPurchases;
        uint[] audioFiles;
        address[] royaltiesOwners;
        uint[] royaltiesPercentages;
    }


    //Mappings
    uint private trackCount;
    uint private albumCount;

    mapping(uint => Track) private tracks;
    mapping(uint => Album) private albums;
    mapping(address => uint[]) private userPurchasedTracks;
    mapping(address => uint[]) private userPurchasedAlbums;

    mapping(address => uint) private artistBalances;


    //Events
    event TrackCreated(uint id, string title, address artist, string imageUrl, string audioFile, uint price, address[] royaltiesOwners, uint[] royaltiesPercentages);
    event AlbumCreated(uint id, string title, address artist, string imageUrl, string description, uint price, address[] royaltiesOwners, uint[] royaltiesPercentages);
    event TrackStreamed(uint trackId, address listener, uint amount);
    event AlbumStreamed(uint albumId, address listener, uint amount);
    event TrackPurchased(uint trackId, address buyer, uint amount);
    event AlbumPurchased(uint albumId, address buyer, uint amount);


    //Modiefiers
     modifier trackExists(uint _trackId) {
        require(_trackId > 0 && _trackId <= trackCount, "Track does not exist");
        _;
    }

    modifier albumExists(uint _albumId) {
        require(_albumId > 0 && _albumId <= albumCount, "Album does not exist");
        _;
    }


    //Add track function
    function addTrack(string memory _title, address _artist, string memory _imageUrl, string memory _audioFile, uint _price, address[] memory _royaltiesOwners, uint[] memory _royaltiesPercentages) public {
        trackCount++;
        tracks[trackCount] = Track(trackCount, _title, _artist, _imageUrl, _audioFile, _price, 0, 0, _royaltiesOwners, _royaltiesPercentages);

        emit TrackCreated(trackCount, _title, _artist, _imageUrl, _audioFile, _price, _royaltiesOwners, _royaltiesPercentages);
    }


    //Add album function
    function addAlbum(string memory _title, address _artist, string memory _imageUrl, string memory _description, uint _price, address[] memory _royaltiesOwners, uint[] memory _royaltiesPercentages) public {
        albumCount++;
        albums[albumCount] = Album(albumCount, _title, _artist, _imageUrl, _description, _price, 0, 0, new uint[](0), _royaltiesOwners, _royaltiesPercentages);

        emit AlbumCreated(albumCount, _title, _artist, _imageUrl, _description, _price, _royaltiesOwners, _royaltiesPercentages);
    }

    //Add track to album function
    function addTrackToAlbum(uint _trackId, uint _albumId) public trackExists(_trackId) albumExists(_albumId) {
        Album storage album = albums[_albumId];
        album.audioFiles.push(_trackId);
    }


    //Fetch track details
    function getTrack(uint _trackId) public view trackExists(_trackId) returns (Track memory) {
        return tracks[_trackId];
    }


    //Fetch album details
    function getAlbum(uint _albumId) public view albumExists(_albumId) returns (Album memory) {
        return albums[_albumId];
    }


    //List all tracks on the platform
    function listAllTracks() public view returns (uint[] memory) {
        uint[] memory allTracks = new uint[](trackCount);
        for (uint i = 1; i <= trackCount; i++) {
            allTracks[i - 1] = tracks[i].id;
        }
        return allTracks;
    }


    //List all albums on the platform
    function listAllAlbums() public view returns (uint[] memory) {
        uint[] memory allAlbums = new uint[](albumCount);
        for (uint i = 1; i <= albumCount; i++) {
            allAlbums[i - 1] = albums[i].id;
        }
        return allAlbums;
    }



    //List all tracks by an artiste
    function listTracksByArtist(address _artist) public view returns (uint[] memory) {
        uint[] memory artistTracks = new uint[](trackCount);
        uint counter = 0;
        for (uint i = 1; i <= trackCount; i++) {
            if (tracks[i].artist == _artist) {
                artistTracks[counter] = tracks[i].id;
                counter++;
            }
        }
        return artistTracks;
    }


    //List all albums by an artiste
    function listAlbumsByArtist(address _artist) public view returns (uint[] memory) {
        uint[] memory artistAlbums = new uint[](albumCount);
        uint counter = 0;
        for (uint i = 1; i <= albumCount; i++) {
            if (albums[i].artist == _artist) {
                artistAlbums[counter] = albums[i].id;
                counter++;
            }
        }
        return artistAlbums;
    }

    //Allow a user to stream a track
    function streamTrack(uint _trackId) public payable trackExists(_trackId) {
        Track storage track = tracks[_trackId];
        require(msg.value >= track.price, "Insufficient payment to stream the track");

        uint royaltiesAmount = calculateRoyalties(track.price, track.royaltiesOwners, track.royaltiesPercentages);
        uint artistAmount = track.price - royaltiesAmount;

        track.totalStreams++;
        artistBalances[track.artist] += artistAmount;
        distributeRoyalties(track.royaltiesOwners, track.royaltiesPercentages, royaltiesAmount);

        emit TrackStreamed(_trackId, msg.sender, track.price);
    }


     //Allow a user to stream an album
    function streamAlbum(uint _albumId) public payable albumExists(_albumId) {
        Album storage album = albums[_albumId];
        require(msg.value >= album.price, "Insufficient payment to stream the album");

        uint royaltiesAmount = calculateRoyalties(album.price, album.royaltiesOwners, album.royaltiesPercentages);
        uint artistAmount = album.price - royaltiesAmount;

        album.totalStreams++;
        artistBalances[album.artist] += artistAmount;
        distributeRoyalties(album.royaltiesOwners, album.royaltiesPercentages, royaltiesAmount);

        emit AlbumStreamed(_albumId, msg.sender, album.price);
    }


    //Purchase track function
     function purchaseTrack(uint _trackId) public payable trackExists(_trackId) {
        Track storage track = tracks[_trackId];
        require(msg.value >= track.price, "Insufficient payment to purchase the track");

        uint royaltiesAmount = calculateRoyalties(track.price, track.royaltiesOwners, track.royaltiesPercentages);
        uint artistAmount = track.price - royaltiesAmount;

        track.totalPurchases++;
        artistBalances[track.artist] += artistAmount;
        distributeRoyalties(track.royaltiesOwners, track.royaltiesPercentages, royaltiesAmount);

        userPurchasedTracks[msg.sender].push(_trackId);

        emit TrackPurchased(_trackId, msg.sender, track.price);
    }


    //Purchase album function
    function purchaseAlbum(uint _albumId) public payable albumExists(_albumId) {
        Album storage album = albums[_albumId];
        require(msg.value >= album.price, "Insufficient payment to purchase the album");

        uint royaltiesAmount = calculateRoyalties(album.price, album.royaltiesOwners, album.royaltiesPercentages);
        uint artistAmount = album.price - royaltiesAmount;

        album.totalPurchases++;
        artistBalances[album.artist] += artistAmount;
        distributeRoyalties(album.royaltiesOwners, album.royaltiesPercentages, royaltiesAmount);

        userPurchasedAlbums[msg.sender].push(_albumId);

        emit AlbumPurchased(_albumId, msg.sender, album.price);
    }


    //Gets a user purchased track
    function getUserPurchasedTracks(address _user) public view returns (uint[] memory) {
        return userPurchasedTracks[_user];
    }

    //Gets a user purchased albums
   function getUserPurchasedAlbums(address _user) public view returns (uint[] memory) {
        return userPurchasedAlbums[_user];
    }

    //Gets total amount an artiste has made on all tracks
   function getTotalTrackAmount(address _artist) public view returns (uint) {
        uint totalAmount = 0;
        for (uint i = 1; i <= trackCount; i++) {
            if (tracks[i].artist == _artist) {
                totalAmount += tracks[i].totalPurchases * tracks[i].price;
            }
        }
        return totalAmount;
    }


    //Gets total amount an artiste has made on all albums
   function getTotalAlbumAmount(address _artist) public view returns (uint) {
        uint totalAmount = 0;
        for (uint i = 1; i <= albumCount; i++) {
            if (albums[i].artist == _artist) {
                totalAmount += albums[i].totalPurchases * albums[i].price;
            }
        }
        return totalAmount;
    }


    //Gets total streams from all tracks by an artiste
    function getTotalTrackStreams(address _artist) public view returns (uint) {
        uint totalStreams = 0;
        for (uint i = 1; i <= trackCount; i++) {
            if (tracks[i].artist == _artist) {
                totalStreams += tracks[i].totalStreams;
            }
        }
        return totalStreams;
    }


    //Gets total streams from all albums by an artiste
    function getTotalAlbumStreams(address _artist) public view returns (uint) {
        uint totalStreams = 0;
        for (uint i = 1; i <= albumCount; i++) {
            if (albums[i].artist == _artist) {
                totalStreams += albums[i].totalStreams;
            }
        }
        return totalStreams;
    }



    //Gets balance of an artiste
    function getArtistBalance(address _artist) public view returns (uint) {
        return artistBalances[_artist];
    }


    //Calculates royalties
     function calculateRoyalties(uint _price, address[] memory _owners, uint[] memory _percentages) private pure returns (uint) {
        uint totalRoyalties = 0;
        for (uint i = 0; i < _owners.length; i++) {
            totalRoyalties += (_price * _percentages[i]) / 100;
        }
        return totalRoyalties;
    }


    //Distributes royalties
    function distributeRoyalties(address[] memory _owners, uint[] memory _percentages, uint _amount) private {
        require(_owners.length == _percentages.length, "Owners and percentages arrays length mismatch");

        for (uint i = 0; i < _owners.length; i++) {
            address payable owner = payable(_owners[i]);
            uint royaltyAmount = (_amount * _percentages[i]) / 100;
            owner.transfer(royaltyAmount);
        }
    }


    
}