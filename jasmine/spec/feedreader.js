/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {

        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have none empty URL', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        it('have name defined', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function () {

        it('element is hidden by default', function () {
            expect(document.body.className).toContain('menu-hidden')
        })

        it('toggles visibility when click', function () {
            $('.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden')
            $('.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden')
        })
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done()
            })
        })
        it('exist after loading feed', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0)
        })
    })

    describe('New Feed Selection', function () {
        var firstFeedContent, newFeedContent

        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeedContent = $('.feed').html()
                loadFeed(1, function () {
                    newFeedContent = $('.feed').html()
                    done()
                })
            })
        })
        it('updates loaded content in separate loadFeed calls', function () {
            expect(firstFeedContent).not.toEqual(newFeedContent)
        })
    })
}());
