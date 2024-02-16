import Text "mo:base/Text";
import List "mo:base/List";

actor Playlists {
  public type Song = {
    id : Text;
    name : Text;
    artist : Text;
  };

  stable var playlist : List.List<Song> = List.nil<Song>();

  // Get playlist as an array
  public query func getPlaylist() : async [Song] {
    return List.toArray(playlist);
  };

  // Add a song to the playlist
  public func addToPlaylist(idText : Text, nameText : Text, artistText : Text) : async () {
    if (idText == "" or nameText == "" or artistText == "") {
      return;
    };

    let song : Song = {
      id = idText;
      name = nameText;
      artist = artistText;
    };

    playlist := List.push(song, playlist);
  };

  // Remove a song from the playlist
  public func removeFromPlaylist(idText : Text) : async () {
    func remove(song : Song) : Bool {
      song.id != idText;
    };

    playlist := List.filter(playlist, remove);
  };

  // Clear the playlist
  public func resetPlaylist() : async () {
    playlist := List.nil<Song>();
  };
};
