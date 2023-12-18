import { expect } from 'chai';
import 'mocha';

it("failing frame is recognized", () => {
    expect( 0 ).to.be.equal(RateSingleFrame('--'));
})

it("splits a line of 10 frames", () => {
    expect( ["--","--","--","--","--","--","--","--","--","--" ] ).to.be.deep.equal(SplitGameIntoFrames('-- -- -- -- -- -- -- -- -- --'));
})

it("failing game is recognized", () => {
    expect( 0 ).to.be.equal(SplitGameIntoFrames('-- -- -- -- -- -- -- -- -- --').reduce((accumulator, frame) => accumulator + RateSingleFrame(frame), 0));
})

it("one frame is 9", () => {
    expect( 9 ).to.be.equal(RateSingleFrame('-9'));
})

it("other part of frame is 9", () => {
    expect( 9 ).to.be.equal(RateSingleFrame('9-'));
})

it("left and right get added", () => {
    expect( 9 ).to.be.equal(RateSingleFrame('81'));
})

function SplitGameIntoFrames(game: string): string[] {
    return game.split(" ");
}

function RateSingleFrame(frame: string): any {
    const valueOfSecondThrow = Number(frame[1]);
    const valueOfFirstThrow = Number(frame[0]);
    const firstThrowIsHit = !isNaN(valueOfFirstThrow);
    const secondThrowIsHit = !isNaN(valueOfSecondThrow);
    
    if (frame == '--' ) {
        return 0;
    } else if (firstThrowIsHit && secondThrowIsHit ) {
        return valueOfFirstThrow + valueOfSecondThrow;
    } else if(secondThrowIsHit){
        return valueOfSecondThrow;
    } else if(firstThrowIsHit){
        return valueOfFirstThrow;
    }
    return -99;
}

