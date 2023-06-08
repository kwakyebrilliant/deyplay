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
        mapping(address => uint) royalties;
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
        mapping(address => uint) royalties;
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
    event TrackAdded(uint trackId, string title, address artist, string imageUrl, uint price);
    event AlbumAdded(uint albumId, string title, address artist, string imageUrl, uint price);
    event TrackStreamed(uint trackId, address listener, uint amount);
    event AlbumStreamed(uint albumId, address listener, uint amount);
    event TrackPurchased(uint trackId, address buyer, uint amount);
    event AlbumPurchased(uint albumId, address buyer, uint amount);

    //Modifiers
    modifier trackExists(uint _trackId) {
        require(_trackId <= trackCount, "Track does not exist");
        _;
    }

    modifier albumExists(uint _albumId) {
        require(_albumId <= albumCount, "Album does not exist");
        _;
    }


    

    
}