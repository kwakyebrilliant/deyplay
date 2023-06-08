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


    
}