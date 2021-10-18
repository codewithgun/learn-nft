pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721 {

    string[] public colors;
    mapping(string => bool) _colorExists;
    mapping(uint256 => string) _tokenURI;

    constructor() ERC721("MyColor", "MyC") public {}

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        if(bytes(_tokenURI[tokenId]).length > 0) {
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _tokenURI[tokenId])) : "";
        }
        return "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI()  internal view virtual override returns (string memory) {
        return "ipfs://";
    }


    function mint(string memory _color, string memory _ipfsHash) public {
        require(!_colorExists[_color], "color exists");
        colors.push(_color);
        uint id = colors.length - 1;
        _safeMint(msg.sender, id);
        _tokenURI[id] = _ipfsHash;
        _colorExists[_color] = true;
    }
}