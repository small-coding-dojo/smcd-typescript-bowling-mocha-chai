import { expect } from 'chai';
import 'mocha';

it("failing frame is recognized", () => {
    expect( 0 ).to.be.equal(RateSingleFrame('--'));
})

it("splits a line of 10 frames", () => {
    expect( ["--","--","--","--","--","--","--","--","--","--" ] ).to.be.deep.equal(SplitGameIntoFrames('-- -- -- -- -- -- -- -- -- --'));
})

it("sums up frames", () => {
    expect( 9 ).to.be.equal(EvaluateGame('-9 -- -- -- -- -- -- -- -- --'));
})

it("sums up frames 2", () => {
    expect( 18 ).to.be.equal(EvaluateGame('-9 -9 -- -- -- -- -- -- -- --'));
    expect( 90 ).to.be.equal(EvaluateGame('-9 -9 9- -9 -9 9- 9- 81 18 27'));
})

//it.each([[18, '-9 -9 -- -- -- -- -- -- -- --']])("sums up frames 3", (expected :number, game :string) => {
//    expect( expected ).to.be.equal(SplitGameIntoFrames(game).reduce((accumulator, frame) => accumulator + RateSingleFrame(frame), 0));
//})

it("failing game is recognized", () => {
    expect( 0 ).to.be.equal(EvaluateGame('-- -- -- -- -- -- -- -- -- --'));
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

function EvaluateGame(game: string): number{
    return SplitGameIntoFrames(game).reduce((accumulator, frame) => accumulator + RateSingleFrame(frame), 0)
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

