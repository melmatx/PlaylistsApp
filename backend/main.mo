import Text "mo:base/Text";
import List "mo:base/List";

actor Playlists {
  public type Song = {
    id : Text;
    name : Text;
    artist : Text;
  };

  var playlist : List.List<Song> = List.nil<Song>();

  public query func getPlaylist() : async [Song] {
    return List.toArray(playlist);
  };

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

  public func removeFromPlaylist(idText : Text) : async () {
    func remove(song : Song) : Bool {
      song.id != idText;
    };

    playlist := List.filter(playlist, remove);
  };

  public func resetPlaylist() : async () {
    playlist := List.nil<Song>();
  };
};
