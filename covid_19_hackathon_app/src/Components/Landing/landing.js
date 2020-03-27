import React, { Component } from "react";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="col">
          <div className="col s12 center-align">
            <h4>
              <b>COVID-19 Facilities Finder</b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
            An application to match you to nearby hospitals, pharmacies, shelters, emergency medical centers, and more!
            </p>
            <br />
            <div className="row">
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign Up
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable pink accent-3"
              >
                Log In
              </Link>
            </div>
            </div>
          </div>
          <div style={{ margin: "2vw" }} className="container">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed metus velit. Donec nec dapibus justo. Nunc efficitur ipsum velit, faucibus sodales nunc finibus ac. Donec et nunc quis dolor euismod tempus vitae sit amet risus. Morbi condimentum sagittis felis eu consectetur. Nullam cursus mollis pellentesque. Mauris hendrerit purus condimentum interdum sagittis. Integer sodales eros at ipsum ullamcorper, eget finibus augue vestibulum. Nunc in pulvinar sapien. Proin in nisi dui. Etiam vulputate erat eu sem venenatis, a porttitor nibh convallis. Etiam massa nunc, laoreet posuere dignissim at, interdum eu felis.

Sed imperdiet dignissim lacinia. Ut cursus justo non felis egestas tempus ut vitae arcu. Proin convallis lectus convallis laoreet sodales. Nunc ultricies pretium eros, non scelerisque erat ornare id. Duis pellentesque tellus tellus, eu dapibus nunc commodo nec. Fusce pellentesque urna risus, vitae elementum nunc laoreet non. Nulla tincidunt feugiat orci, in finibus orci.

Mauris eleifend sodales condimentum. Aliquam in ante odio. Sed ultrices tincidunt nisl. Aliquam molestie augue in risus porttitor, ut porttitor nisl sodales. Aliquam eget condimentum urna. Aliquam erat volutpat. Quisque vestibulum posuere sem ac dignissim. Mauris blandit hendrerit tincidunt. Suspendisse non consectetur quam, eget molestie nisi. Nam nunc leo, dignissim eget pharetra id, lacinia scelerisque mauris. Morbi sodales sollicitudin leo in sodales. Proin imperdiet id turpis in dignissim. Maecenas mattis, mauris ac elementum bibendum, lorem magna blandit sem, elementum posuere ipsum elit sit amet lacus. In tristique aliquet neque eget placerat.

Vivamus convallis dui vitae dolor aliquet, finibus porta mi tempor. Ut nunc turpis, lacinia non congue eget, egestas at ex. Pellentesque ut lacus purus. Integer odio sapien, malesuada sit amet tortor at, bibendum pretium ipsum. Ut feugiat quam nulla, ut finibus est condimentum a. Vestibulum mattis ullamcorper tortor, vel euismod quam varius id. Morbi imperdiet lacinia nulla non feugiat. Proin tincidunt est ut sem aliquam, sed egestas eros volutpat. Sed euismod ut arcu sit amet scelerisque. Nunc nisl justo, efficitur sit amet commodo a, euismod non arcu. Maecenas ut tellus ultrices, maximus nibh sed, sagittis libero. Donec ut nibh non nibh ullamcorper hendrerit vitae id mi. Cras at ullamcorper massa. Nam varius imperdiet nulla, et rutrum massa sollicitudin vel. Vestibulum eu mauris rhoncus diam tincidunt placerat id ac justo. Ut ullamcorper leo tellus, sed sollicitudin metus pulvinar vel.

In hac habitasse platea dictumst. Cras mattis libero at augue ultricies venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam congue turpis justo, a tempus felis faucibus vitae. Vivamus elementum sagittis dictum. Mauris posuere, lectus vitae condimentum commodo, mauris nisl imperdiet urna, in laoreet odio felis vitae mauris. Suspendisse finibus mauris vitae aliquam auctor. Integer scelerisque faucibus purus ut dignissim. Morbi egestas arcu eu ante posuere iaculis.
          </div>
          <div style={{ margin: "2vw" }} className="container">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed metus velit. Donec nec dapibus justo. Nunc efficitur ipsum velit, faucibus sodales nunc finibus ac. Donec et nunc quis dolor euismod tempus vitae sit amet risus. Morbi condimentum sagittis felis eu consectetur. Nullam cursus mollis pellentesque. Mauris hendrerit purus condimentum interdum sagittis. Integer sodales eros at ipsum ullamcorper, eget finibus augue vestibulum. Nunc in pulvinar sapien. Proin in nisi dui. Etiam vulputate erat eu sem venenatis, a porttitor nibh convallis. Etiam massa nunc, laoreet posuere dignissim at, interdum eu felis.

Sed imperdiet dignissim lacinia. Ut cursus justo non felis egestas tempus ut vitae arcu. Proin convallis lectus convallis laoreet sodales. Nunc ultricies pretium eros, non scelerisque erat ornare id. Duis pellentesque tellus tellus, eu dapibus nunc commodo nec. Fusce pellentesque urna risus, vitae elementum nunc laoreet non. Nulla tincidunt feugiat orci, in finibus orci.

Mauris eleifend sodales condimentum. Aliquam in ante odio. Sed ultrices tincidunt nisl. Aliquam molestie augue in risus porttitor, ut porttitor nisl sodales. Aliquam eget condimentum urna. Aliquam erat volutpat. Quisque vestibulum posuere sem ac dignissim. Mauris blandit hendrerit tincidunt. Suspendisse non consectetur quam, eget molestie nisi. Nam nunc leo, dignissim eget pharetra id, lacinia scelerisque mauris. Morbi sodales sollicitudin leo in sodales. Proin imperdiet id turpis in dignissim. Maecenas mattis, mauris ac elementum bibendum, lorem magna blandit sem, elementum posuere ipsum elit sit amet lacus. In tristique aliquet neque eget placerat.

Vivamus convallis dui vitae dolor aliquet, finibus porta mi tempor. Ut nunc turpis, lacinia non congue eget, egestas at ex. Pellentesque ut lacus purus. Integer odio sapien, malesuada sit amet tortor at, bibendum pretium ipsum. Ut feugiat quam nulla, ut finibus est condimentum a. Vestibulum mattis ullamcorper tortor, vel euismod quam varius id. Morbi imperdiet lacinia nulla non feugiat. Proin tincidunt est ut sem aliquam, sed egestas eros volutpat. Sed euismod ut arcu sit amet scelerisque. Nunc nisl justo, efficitur sit amet commodo a, euismod non arcu. Maecenas ut tellus ultrices, maximus nibh sed, sagittis libero. Donec ut nibh non nibh ullamcorper hendrerit vitae id mi. Cras at ullamcorper massa. Nam varius imperdiet nulla, et rutrum massa sollicitudin vel. Vestibulum eu mauris rhoncus diam tincidunt placerat id ac justo. Ut ullamcorper leo tellus, sed sollicitudin metus pulvinar vel.

In hac habitasse platea dictumst. Cras mattis libero at augue ultricies venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam congue turpis justo, a tempus felis faucibus vitae. Vivamus elementum sagittis dictum. Mauris posuere, lectus vitae condimentum commodo, mauris nisl imperdiet urna, in laoreet odio felis vitae mauris. Suspendisse finibus mauris vitae aliquam auctor. Integer scelerisque faucibus purus ut dignissim. Morbi egestas arcu eu ante posuere iaculis.
          </div>
        </div>
      </div>

    );
  }
}

export default Landing;
