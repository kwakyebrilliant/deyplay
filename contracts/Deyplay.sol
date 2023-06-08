// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Deyplay{

    //Album struct
    struct Album {
        uint id;
        string title;
        address artist;
        string imageUrl;
        string description;
        uint price;
        uint[] audioFiles;
        mapping(address => uint) royalties;
        uint totalStreams;
        uint totalPurchases;
    }

    //Track struct
    struct Track {
        uint id;
        string title;
        address artist;
        string imageUrl;
        uint price;
        uint albumId;
        mapping(address => uint) royalties;
        uint totalStreams;
        uint totalPurchases;
    }


    //Mappings
    mapping(uint => Album) public albums;
    mapping(uint => Track) public tracks;
    uint public albumCount;
    uint public trackCount;

    mapping(address => uint[]) public userPurchasedAlbums;
    mapping(address => uint[]) public userPurchasedTracks;
    mapping(address => uint) public artistBalances;


    //Events
    event AlbumCreated(uint id, string title, address artist);
    event TrackCreated(uint id, string title, address artist);
    event TrackStreamed(uint trackId, address user, uint amount);

    
}