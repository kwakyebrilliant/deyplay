// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Deyplay{

    //Track struct
   struct Track {
        uint id;
        string title;
        address artist;
        string imageUrl;
        uint price;
        uint totalStreams;
        uint totalPurchases;
        uint[] audioFiles;
        address[] royaltiesOwners;
        uint[] royaltiesPercentages;
    }


    //Album struct
    struct Album {
        uint id;
        string title;
        string description;
        address artist;
        string imageUrl;
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
    event TrackCreated(uint id, string title, address artist, string imageUrl, uint price);
    event AlbumCreated(uint id, string title, string description, address artist, string imageUrl, uint price);
    event TrackStreamed(uint trackId, address user, uint amount);
    event AlbumStreamed(uint albumId, address user, uint amount);
    event TrackPurchased(uint trackId, address user, uint amount);
    event AlbumPurchased(uint albumId, address user, uint amount);


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
    function addTrack(string memory _title, string memory _imageUrl, uint _price, address[] memory _royaltiesOwners, uint[] memory _royaltiesPercentages) public {
            trackCount++;
            uint[] memory audioFiles;
            tracks[trackCount] = Track(trackCount, _title, msg.sender, _imageUrl, _price, 0, 0, audioFiles, _royaltiesOwners, _royaltiesPercentages);

            emit TrackCreated(trackCount, _title, msg.sender, _imageUrl, _price);
    }


    //Add album function

    
}