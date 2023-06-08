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
        uint[] royaltiesOwners;
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
        uint[] royaltiesOwners;
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
    event AlbumCreated(uint id, string title, address artist, string imageUrl, string description, uint price);
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
     function addTrack(string memory _title, address _artist, string memory _imageUrl, uint _price) public {
        trackCount++;
        tracks[trackCount] = Track(trackCount, _title, _artist, _imageUrl, _price, 0, 0, new uint[](0), new uint[](0));

        emit TrackCreated(trackCount, _title, _artist, _imageUrl, _price);
    }


    //Add album function
      function addAlbum(string memory _title, address _artist, string memory _imageUrl, string memory _description, uint _price, uint[] memory _audioFiles) public {
        require(_audioFiles.length > 0, "Album must have at least one audio file");

        albumCount++;
        albums[albumCount] = Album(albumCount, _title, _artist, _imageUrl, _description, _price, 0, 0, _audioFiles, new uint[](0), new uint[](0));

        emit AlbumCreated(albumCount, _title, _artist, _imageUrl, _description, _price);
    }

    //Add track to album function
    function addTrackToAlbum(uint _trackId, uint _albumId) public trackExists(_trackId) albumExists(_albumId) {
        Album storage album = albums[_albumId];
        album.audioFiles.push(_trackId);
    }

    //List all tracks by an artiste
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


    //List all albums by an artiste
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

    

    
}