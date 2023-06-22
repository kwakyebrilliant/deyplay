// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Deyplay {
    // Track struct
    struct Track {
        uint id;
        string title;
        string description;
        address artist;
        string imageUrl;
        string audioFile;
        uint totalStreams;
        uint totalPurchases;
        uint streamAmount; // New field for stream payment
        address[] royaltiesOwners;
        uint[] royaltiesPercentages;
    }

    //Mappings
    uint private trackCount;
    mapping(uint => Track) private tracks;
    mapping(address => uint) private artistBalances;

    //Events
    event TrackCreated(uint id, string title, string description, address artist, string imageUrl, string audioFile, uint streamAmount, address[] royaltiesOwners, uint[] royaltiesPercentages);
    event TrackStreamed(uint trackId, address listener, uint amount);

    //Modifiers
    modifier trackExists(uint _trackId) {
        require(_trackId > 0 && _trackId <= trackCount, "Track does not exist");
        _;
    }

    // Add track function
    function addTrack(
        string memory _title,
        string memory _description,
        address _artist,
        string memory _imageUrl,
        string memory _audioFile,
        uint _streamAmount,
        address[] memory _royaltiesOwners,
        uint[] memory _royaltiesPercentages
    ) public {
        trackCount++;
        tracks[trackCount] = Track(
            trackCount,
            _title,
            _description,
            _artist,
            _imageUrl,
            _audioFile,
            0,
            0,
            _streamAmount,
            _royaltiesOwners,
            _royaltiesPercentages
        );
        emit TrackCreated(
            trackCount,
            _title,
            _description,
            _artist,
            _imageUrl,
            _audioFile,
            _streamAmount,
            _royaltiesOwners,
            _royaltiesPercentages
        );
    }

    // Fetch track details
    function getTrack(uint _trackId) public view trackExists(_trackId) returns (Track memory) {
        return tracks[_trackId];
    }

    // List all tracks on the platform
    function listAllTracks() public view returns (uint[] memory) {
        uint[] memory allTracks = new uint[](trackCount);
        for (uint i = 1; i <= trackCount; i++) {
            allTracks[i - 1] = tracks[i].id;
        }
        return allTracks;
    }

    // List all tracks by an artist
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

    // Gets the total number of tracks uploaded by an artist
    function getTotalTracksUploadedByArtist(address _artist) public view returns (uint) {
        uint totalTracksUploaded = 0;
        for (uint i = 1; i <= trackCount; i++) {
            if (tracks[i].artist == _artist) {
                totalTracksUploaded++;
            }
        }
        return totalTracksUploaded;
    }

    // Allow a user to stream a track
    function streamTrack(uint _trackId) public payable trackExists(_trackId) {
        Track storage track = tracks[_trackId];
        require(msg.value >= track.streamAmount, "Insufficient payment to stream the track");

        uint royaltiesAmount = calculateRoyalties(track.streamAmount, track.royaltiesOwners, track.royaltiesPercentages);
        uint artistAmount = track.streamAmount - royaltiesAmount;

        track.totalStreams++;
        artistBalances[track.artist] += artistAmount;
        distributeRoyalties(track.royaltiesOwners, track.royaltiesPercentages, royaltiesAmount);

        emit TrackStreamed(_trackId, msg.sender, track.streamAmount);
    }

    // Gets the total amount an artist has made on all tracks
    function getTotalTrackAmount(address _artist) public view returns (uint) {
        uint totalAmount = 0;
        for (uint i = 1; i <= trackCount; i++) {
            if (tracks[i].artist == _artist) {
                totalAmount += tracks[i].totalPurchases * tracks[i].streamAmount;
            }
        }
        return totalAmount;
    }

    // Gets the total streams from all tracks by an artist
    function getTotalTrackStreams(address _artist) public view returns (uint) {
        uint totalStreams = 0;
        for (uint i = 1; i <= trackCount; i++) {
            if (tracks[i].artist == _artist) {
                totalStreams += tracks[i].totalStreams;
            }
        }
        return totalStreams;
    }

    // Gets the balance of an artist
    function getArtistBalance(address _artist) public view returns (uint) {
        return artistBalances[_artist];
    }

    // Calculates royalties
    function calculateRoyalties(uint _streamAmount, address[] memory _owners, uint[] memory _percentages) private pure returns (uint) {
        uint totalRoyalties = 0;
        for (uint i = 0; i < _owners.length; i++) {
            totalRoyalties += (_streamAmount * _percentages[i]) / 100;
        }
        return totalRoyalties;
    }

    // Distributes royalties
    function distributeRoyalties(address[] memory _owners, uint[] memory _percentages, uint _amount) private {
        require(_owners.length == _percentages.length, "Owners and percentages arrays length mismatch");

        for (uint i = 0; i < _owners.length; i++) {
            address payable owner = payable(_owners[i]);
            uint royaltyAmount = (_amount * _percentages[i]) / 100;
            (bool success, ) = owner.call{value: royaltyAmount}("");
            require(success, "Failed to send royalty payment");
        }
    }
}
