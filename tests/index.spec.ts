import { expect } from 'chai';
import 'mocha';

it("failing frame ist recognized", () => {
    expect( 0 ).to.be.equal(RateSingleFrame('--'));
})

it("splits a line of 10 frames", () => {
    expect( ["--","--","--","--","--","--","--","--","--","--" ] ).to.be.deep.equal(SplitGameIntoFrames('-- -- -- -- -- -- -- -- -- --'));
})

it("failing game is recognized", () => {
    expect( 0 ).to.be.equal(SplitGameIntoFrames('-- -- -- -- -- -- -- -- -- --').reduce((accumulator, frame) => accumulator + RateSingleFrame(frame), 0));
})

function SplitGameIntoFrames(game: string): string[] {
    return game.split(" ");
}

function RateSingleFrame(frame: string): any {
    if (frame == '--' ) {
        return 0
    }
    return -99;
}

