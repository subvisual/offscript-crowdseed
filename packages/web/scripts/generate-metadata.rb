#!/usr/bin/env ruby

require 'json'

(1..40).each do |i|
  data = {
    image: "https://nft.web3creatives.com/nfts/1000x1000/#{i}.png",
    images: {
      "1000x1000" => "https://nft.web3creatives.com/nfts/1000x1000/#{i}.png"
    }
  }
  File.open("public/nfts/#{i}.json", "w") do |h|
    h.write(JSON.pretty_generate(data))
  end
end
{
  "image": "https://nfts.web3creatives.com/nfts/1.png"
}
