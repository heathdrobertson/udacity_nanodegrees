pragma solidity >=0.4.24;


contract StringIndex {
    string string1 = "test string";
    
    function stringIndex(uint index) public view returns(strih) {
        bytes memory bytesData = string1;
        bytes element = bytesData[index];
        
        string memory converted = string(element);
        return converted;
    }
}
