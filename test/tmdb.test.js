describe('test tmdb.js', () => {
  test('parse movie name and year from file name', () => {
    const { parseText } = require('../tmdb.js')

    const fileNames = [
      "Billy.Lynn's.Long.Halftime.Walk.2016.1080p.BluRay.x264-[YTS.AG].mp4",
      "Gemini.Man.2019.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "The.Power.Of.The.Dog.2021.2160p.4K.WEB.x265.10bit.HDR.AAC5.1-[YTS.MX].mkv",
      "Tinker.Tailor.Soldier.Spy.2011.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Pacific.Rim.2013.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Memories.Of.Murder.2003.KOREAN.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Godzilla.2014.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Midway.2019.REPACK.2160p.4K.BluRay.x265.10bit.AAC7.1-[YTS.MX].mkv",
      "Ready.Player.One.2018.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Aquaman.2018.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Transformers.The.Last.Knight.2017.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Pulp.Fiction.1994.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Transformers.Age.Of.Extinction.2014.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Transformers.2007.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "13.Hours.2016.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Transformers.Dark.Of.The.Moon.2011.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Transformers.Revenge.Of.The.Fallen.2009.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Saving.Private.Ryan.1998.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv",
      "Watchmen.2009.ULTIMATE.CUT.2160p.4K.BluRay.x265.10bit.AAC5.1-[YTS.MX].mkv"
    ]

    const expected = [
      "Billy Lynn's Long Halftime Walk (2016)",
      "Gemini Man (2019)",
      "The Power Of The Dog (2021)",
      "Tinker Tailor Soldier Spy (2011)",
      "Pacific Rim (2013)",
      "Memories Of Murder (2003)",
      "Godzilla (2014)",
      "Midway (2019)",
      "Ready Player One (2018)",
      "Aquaman (2018)",
      "Transformers The Last Knight (2017)",
      "Pulp Fiction (1994)",
      "Transformers Age Of Extinction (2014)",
      "Transformers (2007)",
      "13 Hours (2016)",
      "Transformers Dark Of The Moon (2011)",
      "Transformers Revenge Of The Fallen (2009)",
      "Saving Private Ryan (1998)",
      "Watchmen (2009)"
    ]

    for (let i = 0; i < fileNames.length; i++) {
      const { query, year } = parseText(fileNames[i]) || {}
      const actual = `${query} (${year})`
      expect(actual).toEqual(expected[i])
    }
  })
});
